var mongoose = require('mongoose')
var Schema = mongoose.Schema

const imageSchema = new Schema({
    url : String
})

module.exports = imageSchema