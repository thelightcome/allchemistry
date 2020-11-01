import React from 'react'
import {Route, NavLink} from 'react-router-dom'

import './Navigation.css'

export const Navigation = (props) => {
	return (
		<nav className="nav">
			<Route exact path="/">
    			<NavLink
	    			to="/inorganic"
	    			className='nav-link main-nav-link'
	    			activeClassName='active'>Неорганика</NavLink>
	    		<NavLink
	    			to="/organic"
	    			className='nav-link main-nav-link'
	    			activeClassName='active'>Органика</NavLink>
    		</Route>
			<Route path="/inorganic">
    			<NavLink
	    			to="/inorganic/st"
	    			className='nav-link un-nav-link'
	    			activeClassName='active'>Стандартная</NavLink>
	    		<NavLink
	    			to="/inorganic/ln"
	    			className='nav-link un-nav-link'
	    			activeClassName='active'>Список</NavLink>
	    		<NavLink
	    			to="/inorganic/tb"
	    			className='nav-link un-nav-link'
	    			activeClassName='active'>Таблица</NavLink>
	    		<NavLink
	    			to="/"
	    			className='nav-link back-nav-link'
	    			activeClassName='active'>Главная</NavLink>
    		</Route>
			<Route path="/organic">
	    		<NavLink
	    			to="/"
	    			className='nav-link back-nav-link'
	    			activeClassName='active'>Главная</NavLink>
    		</Route>
    		
    	</nav>
	)
}