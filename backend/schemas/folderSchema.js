var mongoose = require('mongoose')
var Schema = mongoose.Schema

const itemsSchema = new Schema({
    type : String,
    paths : [String]
})

const folderSchema = new Schema({
    path : String,
    name : String,
    createdDate : Date,
    modification : {
        modifiedDate : Date,
        modificationHistory : [String]
    },
    authors : [String],
    parodies : [String],
    tags : [String],
    favorite : Boolean,
    items : [itemsSchema]
})

// const folderSchema = new Schema({
//     path : String,
//     name : String,
//     createdDate : Date,
//     modification : {
//         modifiedDate : Date,
//         modificationHistory : [String]
//     },
//     authors : [String],
//     parodies : [String],
//     tags : [String],
//     favorite : Boolean,
//     items : [{
//         type : String,
//         paths : [String]
//     }]
// },
// {typeKey : '$type'}
// )

module.exports = folderSchema