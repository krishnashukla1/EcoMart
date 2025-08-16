// FILE: middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack || err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};