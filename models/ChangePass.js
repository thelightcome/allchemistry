const {Schema, model} = require('mongoose')

const schema = new Schema({
	name: {type: String, required: true},
	password: {type: String, required: true},
	chance: {type: Number, required: true, max: 3},
	expireAt: {type: Date, default: Date.now, index: { expires: '5m' }}
})

module.exports = model('ChangePass', schema)