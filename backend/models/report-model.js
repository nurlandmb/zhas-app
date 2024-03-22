const { Schema, model } = require('mongoose');
const ReportSchema = new Schema({
    date: {type: Date, required: true},
    status: {type: String, required: true, default: 'created'},
    author: {type: Schema.Types.ObjectId, ref: 'user'  },
    authorCode: {type: String, required: true},
    content: {type: Object, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true, default: 'first'},
    adminComment: {type: String, required: false, default: ""}
})

module.exports = model('Report-1', ReportSchema)