var mongoose = require('mongoose')
var Schema = mongoose.Schema

const folderSchema = new Schema({
    name : String,
    createdDate : Date,
    authors : [String],
    parodies : [String],
    tags : [String],
    favorite : Boolean,
})

module.exports = folderSchema