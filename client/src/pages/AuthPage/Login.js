import React, {useState, useContext} from 'react'
import {NavLink} from 'react-router-dom'

import './AuthPage.css'

import {AuthContext} from '../../contexts/AuthContext'
import {useRequest} from '../../hooks/request.hook'
import {validateName, validatePassword} from './validationForm'

export const Login = (props) => {
	const auth = useContext(AuthContext)
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const {request, error, clearError} = useRequest()

	async function sendToLogin(e) {
		e.preventDefault()
		try {
			clearError()
			const data = await request('/api/auth/login', 'POST', {name, password})
			auth.login(data.token, data.userId, data.name, data.emailVerify)
		} catch (e) {}
	}

	let errors = {
		name: validateName(name),
		password: validatePassword(password)
	}

	return (
		<div className='form-wrap'>
			<h2>Войти</h2>
			<form name='login'>
				<div className='form-group'>
					<input
						className={`${name ? 'active': ''} ${name && (errors.name ? 'valid': 'error')}`}
						type='text'
						name='login-name'
						id='login-name'
						value={name}
						onChange={(e) => setName(e.target.value)}/>
					<label htmlFor='login-name'>Логин</label>
				</div>
				<div className='form-group'>
					<input
						className={`${password ? 'active': ''} ${password && (errors.password ? 'valid': 'error')}`}
						type='password'
						name='login-password'
						id='login-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}/>
					<label htmlFor='login-password'>Пароль</label>
					{name && <NavLink to="/auth/respawn" className='change-pass-btn'>Забыли пароль?</NavLink>}
				</div>
				<div className='form-option'>
					{error && <p>{error}</p>}
					{((name && !errors.name) || (password && !errors.password)) && <p>Не валидные данные!</p>}
				</div>
				{errors.name && errors.password && <button onClick={sendToLogin}>Отправить</button>}
			</form>
		</div>
	)
}
