var fs = require('fs');
var express = require('express');
var router = express.Router();
var imgur = require('imgur');
var multer = require('multer');
var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 200 * 1000 * 1000
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0,6) === 'image/');
  }
});


router.get('/', function (req, res) {
  res.render('templates/imgur');
});

router.post('/upload', upload.single('image'), function (req, res) {
  console.log(req.file);
  if(req.file){
    imgur
      .uploadFile(req.file.path)
      .then(function (json) {
        fs.unlink(req.file.path, function() {
          res.redirect(json.data.link);
        });
      })
      .catch(function (err){
        res.send(err);
      });
  } else {
    res.status(415).send('must upload an image!!!');
  }
});

module.exports = router;
