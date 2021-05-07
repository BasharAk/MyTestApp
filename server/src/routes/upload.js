const { Router } = require('express');
const ServerError = require('../utils/ServerError');
const sendError = require('../utils');
const uploadMiddleware = require('../middlewares/upload');
const fs = require('fs');

const route = new Router();
/*
route.post('/upload', (req, res) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      const error = new ServerError({
        name: err.name,
        message: err.message + 'fucker',
        code: 500
      });
      sendError(error, res);
    } else {
      //fs.writeFileSync('./public/newfile.jpg', req.file.buffer);
      console.log(req.file.buffer);
      res.status(200).send('Done');
    }
  });
});
*/

route.post('/api/upload', uploadMiddleware, async (req, res) => {
  try {
    await fs.writeFileSync('./public/n.docx', req.file.buffer);

    res.status(200).send('Done');
  } catch (err) {
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    const error = new ServerError({
      name: err.name,
      message: err.message + 'fucker',
      code: 500
    });
    sendError(error, res);
  }
});
module.exports = route;
