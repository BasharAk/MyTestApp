class ServerError extends Error {
  constructor(err) {
    super(err.message);
    this.name = err.name;
    this.code = err.code;
  }
}

module.exports = ServerError;
