const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

const User = require('../models/User')
const ChangePass = require('../models/ChangePass')

const router = Router()

router.post('/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('name', 'Некорректное имя').exists(),
		check('password', 'Некорректный пароль').isLength({min: 8})
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректные данные при регистрации'
			})
		}

		const {email, name, password} = req.body

		const candidate = await User.findOne({name})

		if (candidate) {
			res.status(400).json({message: 'Такой пользователь уже существует'})
			return
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({emailVerify: false, email, name, password: hashedPassword})
		await user.save()

		const token = jwt.sign(
			{userId: user.id},
			config.get('JWT_SECRET'),
			{expiresIn: '1h'}
		)

		sendMail(email, 'Подтверждение электронного адреса на сайте Alchemist table', `Пожалуйста, перейдите по указанной ссылке (ссылка активно только в течение часа) для подтверждения электронного адреса: <a href='http://localhost:3000/auth/verify?id=${token}'>http://${req.get('host')}</a>`)
		res.status(201).json({emailVerify: user.emailVerify, name: user.name, token, userId: user.id})
	} catch (e) {
		res.status(500).json({message: 'Error 404'})
	}
})

router.post('/verify', async (req, res) => {
	try {
		const _id = jwt.verify(req.query.id, config.get('JWT_SECRET')).userId
		const user = await User.findById(_id)
		if (!user || user.emailVerify) {
			return res.status(400).json({message: 'Ссылка не действительна!'})
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password)
		if (!isMatch) {
			return res.status(400).json({message: 'Неправильные данные'})
		}
		user.emailVerify = true
		await user.save()

		res.status(201).json({emailVerify: user.emailVerify})
	} catch (e) {}
})

router.post('/getcoderespawn', async (req, res) => {
	try {
		const user = await User.findOne({name: req.body.name})
		if (!user) {
			return res.status(400).json({message: 'Неправильные данные'})
		}
		if (!user.emailVerify) {
			return res.status(400).json({message: 'Ваш электронный адрес не подтвержден. Вы не сможете восстановить пароль!'})
		}
		const chpass = await ChangePass.findOne({name: req.body.name})
		if (chpass) {
			return res.status(201).json({message: 'Вам уже отправлено код для восстановления пароля!'})
		}
		let pass = randomIntInc(1000, 99999999)
		let newchpass = new ChangePass({name: user.name,  password: pass, chance: 0})
		await newchpass.save()
		sendMail(user.email, 'Восстановление пароля на сайте Alchemist table', `Код для восстановление пароля: ${pass}`)
		res.status(200)
	} catch (e) {}
})

router.post('/respawn',
	[
		check('password', 'Некорректный пароль').isLength({min: 8})
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный пароль'
			})
		}

		const chpass = await ChangePass.findOne({name: req.body.name})
		if (!chpass) {
			return res.status(201).json({message: 'Вы не запрашивали код для восстановления пароля!'})
		}

		if (!(chpass.password == req.body.code)) {
			chpass.chance += 1
			await chpass.save()

			if (chpass.chance >= 3) {
				await ChangePass.deleteOne({_id: chpass.id})
				return res.status(201).json({message: 'Вы не запрашивали код для восстановления пароля!'})
			}
			return res.status(400).json({message: 'Вы неправильно ввели код!'})
		}

		const user = await User.findOne({name: req.body.name})

		if (!user) {
			return res.status(400).json({message: 'Неправильные данные'})
		}
		await ChangePass.deleteOne({_id: chpass.id})

		const hashedPassword = await bcrypt.hash(req.body.password, 12)

		user.password = hashedPassword
		await user.save()

		res.status(201)
	} catch (e) {}
})

router.post('/login',
	[
		check('name', 'Некорректное имя').exists(),
		check('password', 'Введите корректный пароль').exists()
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректные данные при входе в систему'
			})
		}

		const {name, password} = req.body
		const user = await User.findOne({name})

		if (!user) {
			return res.status(400).json({message: 'Неправильные данные'})
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.status(400).json({message: 'Неправильные данные'})
		}

		const token = jwt.sign(
			{userId: user.id},
			config.get('JWT_SECRET'),
			{expiresIn: '1h'}
		)

		res.json({emailVerify: user.emailVerify, name: user.name, token, userId: user.id})
	} catch (e) {
		console.log(e)
		res.status(500).json({message: 'Error 404'})
	}
})

function randomIntInc(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low)
}

async function sendMail(mailTo, subject, message) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.get('gmail'),
			pass:config.get('gmailpassword'),
		},
	});

	let info = await transporter.sendMail({
		from: config.get('gmail'),
		to: mailTo,
		subject: subject,
		html: message,
	});
}

module.exports = router