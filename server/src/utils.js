const sendError = (err, res) => {
  const message = err.toString();
  res.status(err.code ? err.code : 500);
  res.statusMessage = message !== '' ? message : 'Internal server error';
  res.send();
};

module.exports = sendError;
