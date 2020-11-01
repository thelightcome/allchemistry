const {model, Schema} = require('mongoose')

const schema = new Schema({
	reagents: {type: [], required: true, default: undefined},
	products: {type: [], required: true, default: undefined},
	direction: {type: String, required: true, enum: ['left', 'right', 'both', 'equal']}
})

module.exports =  model('Reaction', schema)