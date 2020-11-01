import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
	token: null,
	emailVerify: null,
	userId: null,
	name: null,
	login: noop,
	logout: noop,
	isAuthenticated: false
})