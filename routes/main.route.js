const {Router} = require('express')

const Reaction = require('../models/Reaction')
const Element = require('../models/Element')

const MainRoute = new Router()

MainRoute.get('/elements', async (req, res) => {
	try {
		const elements = await Element.find({})
		res.json(elements)
	}
	catch (e) {
		res.status(404).json({message: 'Запрос не обработан!'})
	}
})

MainRoute.post('/record', async (req, res) => {
	try {
		let {reagents, products} = req.body
		reagents.forEach((elem) => {
			if (!(/[\{\[\(]?[a-zA-Z0-9\{\}\[\]\(\)]+[\)\]\}]?/.test(elem))) {
				res.status(422).json({message: 'Уравнение химической реакции неверно введено!'})
			}
		})
		products.forEach((elem) => {
			if (!(/[\{\[\(]?[a-zA-Z0-9\{\}\[\]\(\)]+[\)\]\}]?/.test(elem))) {
				res.status(422).json({message: 'Уравнение химической реакции неверно введено!'})
			}
		})

		const reaction = await Reaction.findOne({}).where('reagents').all(reagents) || await Reaction.findOne({}).where('products').all(reagents)
		if (!reaction) {
			const newreaction = new Reaction({reagents: reagents, products: products, direction: req.body.direction || 'equal'})
			await newreaction.save()
			res.status(201).json({message: 'Формула сохранена!'})
		}
		else {
			res.status(401).json({message: 'Формула уже сохранена!'})
		}
	}
	catch (err) {
		res.status(404).json({message: 'Запрос не обработан!'})
	}
})

function parseReaction(val) {
	return val.split('=')[0].split('+').map((elem) => {
		let index = elem.search(/[a-zA-Z]/)
		return {
			count: elem.slice(0, index).trim(),
			reagent: elem.slice(index).trim()
		}
	})
}

MainRoute.get('/search', async (req, res) => {
	try {
		let reagents = parseReaction(req.query.reagents)
		reagents.forEach((elem) => {
			if (!(/[\{\[\(]?[a-zA-Z0-9\{\}\[\]\(\)]+[\)\]\}]?/.test(elem))) {
				res.status(422).json({message: 'Уравнение химической реакции неверно введено!'})
			}
		})
		const reaction = await Reaction.find({}).where('reagents').all(reagents) || await Reaction.findOne({}).where('products').all(reagents)
		if (reaction) {
			res.json(reaction)
		}
		res.status(401).json({message: 'Поиск не дал результатов.'})
	}
	catch (err) {}
})

MainRoute.use('/api/auth', require('./auth.route.js'))

module.exports = MainRoute