const { connect } = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const dbConnect = async () => {
  try {
    await connect(`${process.env.DB_URL}`, options);
    console.log('Connected To Database');
  } catch (error) {
    console.log('Data Base Connection Failed...');
    console.log(error);
  }
};

module.exports = dbConnect;
