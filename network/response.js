const { StatusCodes, ReasonPhrases } = require("http-status-codes");
exports.success = (req, res, message = "", status = StatusCodes.OK) => {
  res.status(status).send({
    error: false,
    status: status,
    body: message
  });
};

exports.error = (req, res, message = ReasonPhrases.INTERNAL_SERVER_ERROR, status = StatusCodes.INTERNAL_SERVER_ERROR) => {
  res.status(status).send({
    error: true,
    status: status,
    body: message
  });
};
