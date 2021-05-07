const multer = require('multer');
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
*/

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: {
    //fileSize: 1024 * 512
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
}).single('upload');

module.exports = upload;
