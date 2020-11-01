import React, {useState, useContext} from 'react'

import './AuthPage.css'

import {AuthContext} from '../../contexts/AuthContext'
import {useRequest} from '../../hooks/request.hook'
import {validateEmail, validateName, validatePassword, validateRepassword} from './validationForm'

export const Register = (props) => {
	const auth = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [repassword, setRepassword] = useState('')
	const {request, error, clearError} = useRequest()

	async function sendToRegister(e) {
		e.preventDefault()
		try {
			clearError()
			const data = await request('/api/auth/register', 'POST', {email, name, password})
			auth.login(data.token, data.userId, data.name, data.emailVerify)
		} catch (e) {}
	}

	let errors = {
		email: validateEmail(email),
		name: validateName(name),
		password: validatePassword(password),
		repassword: validateRepassword(password, repassword)
	}

	return (
		<div className='form-wrap'>
			<h2>Регистрация</h2>
			<form name='register'>
				<div className='form-group'>
					<input
						className={`${email ? 'active': ''} ${email && (errors.email ? 'valid': 'error')}`}
						type='email'
						name='register-email'
						id='register-email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}/>
					<label htmlFor='register-email'>Введите эл. адрес</label>
				</div>
				<div className='form-group'>
					<input
						className={`${name ? 'active': ''} ${name && (errors.name ? 'valid': 'error')}`}
						type='text'
						name='register-name'
						id='register-name'
						value={name}
						onChange={(e) => setName(e.target.value)}/>
					<label htmlFor='register-name'>Введите логин</label>
				</div>
				<div className='form-group'>
					<input
						className={`${password ? 'active': ''} ${password && (errors.password ? 'valid': 'error')}`}
						type='password'
						name='register-password'
						id='register-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}/>
					<label htmlFor='register-password'>Введите пароль</label>
				</div>
				<div className='form-group'>
					<input
						className={`${repassword ? 'active': ''} ${repassword && (errors.repassword ? 'valid': 'error')}`}
						type='password'
						name='register-repassword'
						id='register-repassword'
						value={repassword}
						onChange={(e) => setRepassword(e.target.value)}/>
					<label htmlFor='register-repassword'>Повторите пароль</label>
				</div>
				<div className='form-option'>
					{error && <p>{error}</p>}
					{(email && !errors.email) && <p className='error'>Невалидный E-mail!</p>}
					<p className={errors.name ? 'valid': 'error'}>Логин: Можно использовать только латинские буквы (первый символ только буква), арабские цифры, дефис, точка, нижнее подчеркывание (Не больше 40 символов)!</p>
					<p className={errors.password ? 'valid': 'error'}>Пароль: Можно использовать только латинские буквы и арабские цифры (не менее 8 символов)!</p>
					{(repassword && !errors.repassword) && <p className='error'>Пароль повторно не правильно введен!</p>}
				</div>
				{errors.email && errors.name && errors.password && errors.repassword && <button onClick={sendToRegister}>Отправить</button>}
			</form>
		</div>
	)
}
