const express = require('express')
// const btoa = require('btoa')
const mongoose = require('mongoose')
const configuration = require('../configuration')
const folderSchema = require('../schemas/folderSchema')

const router = express.Router()
const Folder = mongoose.model('Folder', folderSchema)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

router.get('/list', async (req, res) => {

  console.log(req.query)

  let queryObject = Folder.find({}, 'name')

  if (req.query.name) {
    queryObject = queryObject.regex('name', new RegExp(req.query.name))
  }

  const queryResult = await queryObject.lean()
  res.send(queryResult)
})

router.get('/:id/detail', (req, res) => {
  Folder.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

router.get('/:id/thumbnail', (req, res) => {
  Folder.find({ _id: req.params.id }, 'name items', (err, queryResult) => {
    res.sendFile(
      (queryResult[0].items[req.query.index] &&
        `${configuration.THUMBNAIL_URL_PREFIX + queryResult[0].name}\\${
          queryResult[0].items[req.query.index]
        }`) || // 썸네일이 존재하면 그것을
        `${configuration.THUMBNAIL_URL_PREFIX}\\NoThumbnail.jpg` // 없으면 nothumbnail을
    )
  })
  // Folder.find({ _id: req.params.id }, "name items", (err, queryResult) => {
  //   Promise.all(
  //     queryResult[0].items.map((item, index) => {
  //       return new Promise((resolve, reject) => {
  //         fs.readFile(configuration.THUMBNAIL_URL_PREFIX + queryResult[0].name + "\\" + item, (err, file) => {
  //           const encoded = customBtoa(file)
  //           const type = getFileExtention(item)
  //           const imgSrcString = `data:image/${type};base64,${encoded}`;
  //           resolve(imgSrcString)
  //         })
  //       })
  //     })
  //   ).then((thumbnails) => {
  //     res.send(thumbnails)
  //   })
  // })
})

router.get('/:id/item', (req, res) => {
  const { id } = req.params
  const { index } = req.query

  Folder.find({ _id: id }, 'name path items', (err, queryResult) => {
    res.sendFile(`${queryResult[0].path}\\${queryResult[0].items[index]}`)
  })
})

// function customBtoa(buffer) {
//   const uint8Array = new Uint8Array(buffer)
//   const data = uint8Array.reduce((acc, value, index) => {
//     acc += String.fromCharCode(value)
//     return acc
//   }, '')
//   return btoa(data)
// }

// function getFileExtention(fileName) {
//   return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
// }

module.exports = router
