const { Schema, model } = require('mongoose');
const PostSchema = new Schema({
    date: {type: Date, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    for: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    status: {type: String, required: true, default: 'created'}
})

module.exports = model('Post', PostSchema);
