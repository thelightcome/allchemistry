import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'

import './Header.css'

import {AuthContext} from '../contexts/AuthContext'

export const Header = (props) => {
	const auth = useContext(AuthContext)
	
	return (
		<header className="header">
			<div className="header-top">
				<div className="customization-ctrl">

				</div>
				<div className="auth-ctrl">
					{auth.isAuthenticated && <span className='link' onClick={auth.logout}>Выйти</span>}
					{!auth.isAuthenticated && <NavLink to="/auth/login" className='link' activeClassName='active'>Логин</NavLink>}
					{!auth.isAuthenticated && <NavLink to="/auth/register" className='link' activeClassName='active'>Регистрация</NavLink>}
				</div>
			</div>
			<div className="header-bottom">
				<a className="logo" href="/">Allхимия</a>
			</div>
		</header>
	)
}