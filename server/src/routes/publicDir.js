const { Router, static } = require('express');

const publicDirRoute = new Router();
publicDirRoute.use(static('./public'));

module.exports = publicDirRoute;
