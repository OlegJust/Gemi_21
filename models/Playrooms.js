const {Schema, model} = require('mongoose')

const schema = new Schema({
    type:{type: String, required: true},
    name: {type: String, required: true, unique: true}, // так как это обизательное поле ставим required: true
})

module.exports = model('Playrooms', schema)
