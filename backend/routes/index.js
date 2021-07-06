var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var configuration = require('../configuration.js')
var fs = require('fs')
var btoa = require('btoa')

var folderSchema = require('../schemas/folderSchema.js');
const { time } = require('console');
var Folder = mongoose.model('Folder', folderSchema)

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

router.get('/list', async function (req, res, next) {
  const begin = req.query.begin
  const size = req.query.size

  delete req.query.begin
  delete req.query.size

  let result = await Folder.find(req.query, 'name').lean()
  result = result.splice(begin, size)

  Promise.all(
    result.map((element, index) => {
      return new Promise((resolve, rejext) => {
        fs.readdir(configuration.THUMBNAIL_URL_PREFIX + element.name, (err, fileList) => {
          fs.readFile(configuration.THUMBNAIL_URL_PREFIX + element.name + "\\" + fileList[0], (err, file) => {
            const encoded = customBtoa(file)
            const type = "jpg"
            const imgSrcString = `data:image/${type};base64,${encoded}`;
            element.thumbnail = imgSrcString
            resolve()
          })
        })
      })
    })
  ).then(() => {
    res.send(result)
  })

})

router.get('/:id/detail', function (req, res, next) {
  Folder.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

router.get('/:id/thumbnail', function (req, res, next) {
  Folder.find({ _id: req.params.id }, "name", (err, result) => {
    fs.readdir(configuration.THUMBNAIL_URL_PREFIX + result[0].name, (err, fileList) => {
      Promise.all(
        fileList.map((fileName, index) => {
          return new Promise((resolve, reject) => {
            fs.readFile(configuration.THUMBNAIL_URL_PREFIX + result[0].name + "\\" + fileName, (err, file) => {
              const encoded = customBtoa(file)
              const type = "jpg"
              const imgSrcString = `data:image/${type};base64,${encoded}`;
              resolve(imgSrcString)
            })
          })
        })
      ).then((result) => {
        res.send(result)
      })
    })
  })
})

router.get('/:id/item', function (req, res, next) {
  const id = req.params.id;
  const index = req.query.index;

  Folder.find({_id: id}, "name", (err, queryResult) => {
    fs.readdir(configuration.URL_PREFIX + queryResult[0].name, (err, fileList) => {
      console.log(configuration.URL_PREFIX + queryResult[0].name + "\\" + fileList[index])
        res.sendFile(configuration.URL_PREFIX + queryResult[0].name + "\\" + fileList[index])
    })
  })
})

function customBtoa(buffer) {
  const uint8Array = new Uint8Array(buffer)
  const data = uint8Array.reduce((acc, value, index) => {
    acc += String.fromCharCode(value)
    return acc
  }, '')
  return btoa(data)
}

module.exports = router;
