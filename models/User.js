const {Schema, model} = require('mongoose')

const schema = new Schema({
	emailVerify: {type: Boolean, required: true},
	email: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	password: {type: String, required: true}
})

module.exports = model('User', schema)