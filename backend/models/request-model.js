const { Schema, model } = require('mongoose');
const RequestSchema = new Schema({
    date: {type: Date, required: true},
    status: {type: String, required: true, default: 'created'},
    content: {type: Object, required: true},
    code: {type: Number, required: true},
    adminComment: {type: String, required: false, default: ""}
})

module.exports = model('Request', RequestSchema)