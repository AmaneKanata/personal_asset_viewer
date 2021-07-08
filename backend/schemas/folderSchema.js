var mongoose = require('mongoose')
var Schema = mongoose.Schema

const folderSchema = new Schema({
    path: String,
    name : String,
    createdDate : Date,
    authors : [String],
    parodies : [String],
    tags : [String],
    favorite : Boolean,
    items: [String],
    thumbnail: String
})

module.exports = folderSchema