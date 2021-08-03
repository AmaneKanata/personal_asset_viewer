const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const configuration = require('../configuration')
const folderSchema = require('../schemas/folderSchema')

const router = express.Router()
const Folder = mongoose.model('Folder', folderSchema)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

const multerSettings = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, configuration.UPLOAD_DESTINATION)
  },
  filename(req, file, callback){
    callback(null, `${file.originalname}`)
  }
})
const upload = multer({storage: multerSettings})

// router.post('/post', upload.single('fileList'), (req, res) => {
//   console.log(req)
//   res.send(req.file)
// })
router.post('/post', upload.array('fileList'), (req, res) => {
  console.log(req.files)
  res.send(req.files)
})

router.get('/list', async (req, res) => {
  let queryObject = Folder.find({}, 'name favorite')

  if (req.query.name) {
    queryObject = queryObject.regex('name', new RegExp(req.query.name, 'i'))
  }

  if (req.query.favorite) {
    queryObject = queryObject.where('favorite', req.query.favorite)
  }

  const queryResult = await queryObject.lean()
  res.send(queryResult)
})

router.delete('/:id/item', (req, res) => {
  Folder.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        items: {
          $in: req.query.fileName,
        },
      },
    },
    (err) => {
      if (err) {
        res.statusCode(400)
        res.send('fail to delete')
      }
      res.send('delete complete')
    }
  )
})

router.delete('/:id', (req, res) => {
  Folder.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.statusCode(400)
      res.send('fail to delete')
    }
    res.send('delete complete')
  })
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
    if(req.query.name) {
      res.sendFile(
        (queryResult[0].items.includes(req.query.name) &&
          `${configuration.THUMBNAIL_URL_PREFIX + queryResult[0].name}\\${
            req.query.name
          }`) ||
          `${configuration.THUMBNAIL_URL_PREFIX}\\NoThumbnail.jpg` 
      )
    } else if(req.query.index) {
      res.sendFile(
        (queryResult[0].items[req.query.index] &&
          `${configuration.THUMBNAIL_URL_PREFIX + queryResult[0].name}\\${
            queryResult[0].items[req.query.index]
          }`) || // 썸네일이 존재하면 그것을
          `${configuration.THUMBNAIL_URL_PREFIX}\\NoThumbnail.jpg` // 없으면 nothumbnail을
      )
    }
  })
})

router.get('/:id/item', (req, res) => {
  const { id } = req.params
  const { index } = req.query

  Folder.find({ _id: id }, 'name path items', (err, queryResult) => {
    res.sendFile(`${queryResult[0].path}\\${queryResult[0].items[index]}`)
  })
})

router.patch('/:id/favorite', (req, res) => {
  const { id } = req.params
  const { target } = req.body

  Folder.updateOne({ _id: id }, { favorite: target }, (err, result) => {
    res.send(result)
  })
})

module.exports = router
