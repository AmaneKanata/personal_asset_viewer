var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var configuration = require('../configuration.js')
var fs = require('fs')

var folderSchema = require('../schemas/folderSchema.js');
const { send } = require('process');
var Folder = mongoose.model('Folder', folderSchema)

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

// router.get('/', function (req, res, next) {
//   const folder = new Folder({
//     path: "testPath",
//     name: "testName",
//     createdDate: Date.now(),
//     modification: {
//       modifiedDate: Date.now(),
//       modificationHistory: []
//     },
//     authors: ["testAuthor"],
//     parodies: ["testParody"],
//     tags: ["testTag"],
//     favorite: true,
//     items: [
//       {
//         type: "jpg",
//         paths: [
//           "1"
//         ]
//       }
//     ]
//   });
//   console.log(folder)
//   folder.save(function (err) {
//     if (err) {
//       console.log("err when saveing instance")
//       console.log(err)
//     } else {
//       console.log("save complete")
//     }
//   })
//   res.send()
// });

router.get('/list', function (req, res, next) {
  const begin = req.query.begin
  const size = req.query.size

  delete req.query.begin
  delete req.query.size

  Folder.find(req.query, 'name', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result.splice(begin, size))
    }
  })
})

router.get('/cover/:id', function (req, res, next) {
  Folder.find({ _id: req.params.id }, 'items', (err, result) => {
    if (err) {
      res.send(err)
    } else {
      const id = req.params.id
      const type = result[0].items[0].type

      getItemPath(id, type, 0)
        .then((path) => {
          res.sendFile(path)
        })
    }
  })
})

router.get('/detail/:id', function (req, res, next) {
  Folder.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

router.get('/item', function (req, res, next) {
  const id = req.query.id;
  const type = req.query.type;
  const index = req.query.index;

  getItemPath(id, type, index)
    .then((path) => {
      res.sendFile(path)
    })
})

function getItemPath(id, type, index) {

  return new Promise((resolve, reject) => {
    Folder.find({ _id: id }, (err, result) => {
      if (err) {
        // res.status(404).send("No matching Id")
        reject(err)
      } else {
        const folder = result[0]
        let items
        folder.items.every(element => {
          if (element["type"] === type) {
            items = element
            return false;
          }
        });
        const path = folder.path + "\\" +
          items.paths[index] + "." + type;
        resolve(path)
      }
    })
  })
}

module.exports = router;
