import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)
	const [emailVerify, setEmailVerify] = useState(null)
	const [name, setName] = useState(null)

	const login = useCallback((jwtToken, id, name, emailVerify) => {
		setToken(jwtToken)
		setUserId(id)
		setName(name)
		setEmailVerify(emailVerify)

		localStorage.setItem(storageName, JSON.stringify({
			userId: id, token: jwtToken, name: name, emailVerify: emailVerify
		}))
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		setName(null)
		setEmailVerify(null)

		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))

		if (data && data.token) {
			login(data.token, data.userId, data.name, data.emailVerify)
		}
	}, [login])

	return {login, logout, token, userId, name, emailVerify}
}