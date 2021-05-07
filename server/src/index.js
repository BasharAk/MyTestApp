const express = require('express');
const dbConnect = require('./db/mongoose');
const compression = require('compression');
const cors = require('cors');

const restaurantsRoute = require('./routes/restaurants');
const usersRoute = require('./routes/users');
const protectedRoute = require('./routes/protected');
const upload = require('./routes/upload');
const publicDirRoute = require('./routes/publicDir');

const app = express();

dbConnect();

app.use(express.json());
app.use(compression());
app.use(cors());

app.use(restaurantsRoute);
app.use(usersRoute);
app.use(protectedRoute);
app.use(upload);
app.use(publicDirRoute);

app.listen(process.env.PORT_SERVER, () =>
  console.log(`Server Started On Port ${process.env.PORT_SERVER}`)
);
