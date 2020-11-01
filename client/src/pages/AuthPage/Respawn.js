import React, {useState, useEffect, useCallback} from 'react'

import './AuthPage.css'

import {useRequest} from '../../hooks/request.hook'
import {validateName, validatePassword, validateRepassword, validateCode} from './validationForm'

export const Respawn = (props) => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [repassword, setRepassword] = useState('')
	const [code, setCode] = useState('')
	const {request, error, clearError} = useRequest()

	const respawnPass = useCallback(async () => {
		try {
			clearError()
			await request('/api/auth/getcoderespawn', 'POST', {name})
		} catch (e) {}
	}, [clearError, request, name])

	useEffect(() => {
		respawnPass()
	}, [respawnPass])

	async function sendToRespawn(e) {
		e.preventDefault()
		try {
			clearError()
			await request('/api/auth/respawn', 'POST', {name, code, password})
		} catch (e) {}
	}

	let errors = {
		name: validateName(name),
		password: validatePassword(password),
		repassword: validateRepassword(password, repassword),
		code: validateCode(code)
	}

	return (
		<div className='form-wrap'>
			<h2>Подтверждение электронного адреса</h2>
			<form name='respawn'>
				<div className='form-group'>
					<input
						className={`${name ? 'active': ''} ${name && (errors.name ? 'valid': 'error')}`}
						type='text'
						name='respawn-name'
						id='respawn-name'
						value={name}
						onChange={(e) => setName(e.target.value)}/>
					<label htmlFor='respawn-name'>Логин</label>
				</div>
				<div className='form-group'>
					<input
						className={`${code ? 'active': ''} ${code && (errors.code ? 'valid': 'error')}`}
						type='text'
						name='respawn-code'
						id='respawn-code'
						value={code}
						onChange={(e) => setCode(e.target.value)}/>
					<label htmlFor='respawn-code'>Введите код</label>
				</div>
				<div className='form-group'>
					<input
						className={`${password ? 'active': ''} ${password && (errors.password ? 'valid': 'error')}`}
						type='password'
						name='respawn-password'
						id='respawn-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}/>
					<label htmlFor='respawn-password'>Введите пароль</label>
				</div>
				<div className='form-group'>
					<input
						className={`${repassword ? 'active': ''} ${repassword && (errors.repassword ? 'valid': 'error')}`}
						type='password'
						name='respawn-repassword'
						id='respawn-repassword'
						value={repassword}
						onChange={(e) => setRepassword(e.target.value)}/>
					<label htmlFor='respawn-repassword'>Повторите пароль</label>
				</div>
				<div className='form-option'>
					{error && <p>{error}</p>}
					<p className={errors.password ? 'valid': 'error'}>Пароль: Можно использовать только латинские буквы и арабские цифры (не менее 8 символов)!</p>
					{(repassword && !errors.repassword) && <p className='error'>Пароль повторно не правильно введен!</p>}
				</div>
				{errors.name && errors.password && errors.repassword && errors.code && <button onClick={sendToRespawn}>Отправить</button>}
			</form>
		</div>
	)
}
