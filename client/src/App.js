import React, {useState, useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import {AuthContext} from './contexts/AuthContext'
import {useRequest} from './hooks/request.hook.js'
import {useAuth} from './hooks/auth.hook.js'

import {Loading} from './uicomponents/Loading'
import {Header} from './components/Header'
import {Navigation} from './components/Navigation'
import {MainPage} from './pages/MainPage/MainPage'
import {Login} from './pages/AuthPage/Login'
import {Register} from './pages/AuthPage/Register'
import {Respawn} from './pages/AuthPage/Respawn'
import {Verify} from './pages/AuthPage/Verify'
import {StandartTable} from './pages/StandartTable/StandartTable'
import {LineTable} from './pages/LineTable/LineTable'
import {Table} from './pages/Table/Table'

function App() {
	const {login, logout, token, userId, name, emailVerify} = useAuth(),
		  isAuthenticated = !!token,
		  {loading, request} = useRequest(),
		  [elements, setElements] = useState([])

	const getElements = useCallback(async () => {
		try {
			const fetched = await request('/elements', 'GET')
			setElements(fetched.sort((elem, elem2) => {
				if (elem['number'] > elem2['number']) return 1
				if (elem['number'] < elem2['number']) return -1
				return 0
			}))
		} catch (e) {}
	}, [setElements, request])

	useEffect(() => {
		getElements()
	}, [getElements])

	if (loading) {
		return <Loading />
	}

    return (
    	<AuthContext.Provider value={{login, logout, token, userId, name, emailVerify, isAuthenticated}}>
    		<div className="app">
	        	<Router>
			    	<Header />
			    	<Navigation />
			    	<Switch>
			    		<Route exact path="/">
			    			<MainPage
			    				elements={elements.map((elem) => {
			    					return {
			    						id: elem._id,
			    						symbol: elem.symbol,
			    						family: elem.family
			    					}
			    				})} />
			    		</Route>
			    		<Route exact path="/inorganic">
    						<Redirect to="/inorganic/st" />
			    		</Route>
	    				<Route exact path="/inorganic/st">
	    					<StandartTable elements={elements} />
			    		</Route>
	    				<Route exact path="/inorganic/ln">
	    					<LineTable elements={elements} />
			    		</Route>
	    				<Route exact path="/inorganic/tb">
	    					<Table elements={elements} />
			    		</Route>
			    		{emailVerify && <Route path="/auth">
    						<Redirect to="/" />
  						</Route>}
			    		<Route exact path="/auth/verify">
			    			<Verify />
			    		</Route>
            			{isAuthenticated && <Route path="/auth">
    						<Redirect to="/" />
  						</Route>}
			    		<Route exact path="/auth/register">
			    			<Register />
			    		</Route>
			    		<Route exact path="/auth/login">
			    			<Login />
			    		</Route>
			    		<Route exact path="/auth/respawn">
			    			<Respawn />
			    		</Route>	
			    	</Switch>
	        	</Router>
	        </div>
    	</AuthContext.Provider>
    );
}

export default App;