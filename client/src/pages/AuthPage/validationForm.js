export const validateEmail = (email) => {
	let regexp = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
	if (regexp.test(email)) {
		return true
	}
	return false
}

export const validateName = (name) => {
	let regexp = RegExp(/^[a-zA-Z][a-zA-Z0-9-_.]{1,40}$/)
	if (regexp.test(name)) {
		return true
	}
	return false
}

export const validatePassword = (password) => {
	let regexp = RegExp(/[A-Za-z0-9]{7,}/)
	if (regexp.test(password)) {
		return true
	}
	return false
}

export const validateRepassword = (password, repassword) => {
	if (password === repassword) {
		return true
	}
	return false
}

export const validateCode = (code) => {
	if (code) {
		return true
	}
	return false
}