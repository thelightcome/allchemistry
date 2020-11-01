import React, {useState, useContext} from 'react'

import './AuthPage.css'

import {AuthContext} from '../../contexts/AuthContext'
import {useRequest} from '../../hooks/request.hook'
import {validatePassword} from './validationForm'

export const Verify = (props) => {
	const auth = useContext(AuthContext)
	const [password, setPassword] = useState('')
	const {request, error, clearError} = useRequest()

	const getParam = (key) => {
	    let p = window.location.search;
	    p = p.match(new RegExp(key + '=([^&=]+)'));
	    return p ? p[1] : false;
	}

	async function sendToVerify(e) {
		e.preventDefault()
		try {
			clearError()
			const data = await request('/api/auth/verify?id='+getParam('id'), 'POST', {password})
			auth.login(auth.token, auth.userId, auth.name, data.emailVerify)
		} catch (e) {}
	}

	let errors = {
		password: validatePassword(password)
	}

	return (
		<div className='form-wrap'>
			<h2>Подтверждение электронного адреса</h2>
			<form name='verify'>
				<div className='form-group'>
					<input
						className={`${password ? 'active': ''} ${password && (errors.password ? 'valid': 'error')}`}
						type='password'
						name='verify-password'
						id='verify-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}/>
					<label htmlFor='verify-password'>Пароль</label>
				</div>
				<div className='form-option'>
					{error && <p>{error}</p>}
					{(password && !errors.password) && <p>Не валидные данные!</p>}
				</div>
				{errors.password && <button onClick={sendToVerify}>Отправить</button>}
			</form>
		</div>
	)
}
