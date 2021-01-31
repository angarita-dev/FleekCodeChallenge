const mongoose = require("mongoose");

// Models
const Request = require('../models/request');
const Key = require("../models/key");

module.exports = {
  verifyAndUpdateApiKey: (req, res, next) => {
    const ERROR_JSON = { error: 'Missing or invalid API key'}

    const authHeader = req.headers.authorization;
    if (!authHeader) res.status(401).json(ERROR_JSON);

    const apiKey = authHeader.split(' ')[1];
    if (!apiKey) res.status(401).json(ERROR_JSON);

    Key.findOneAndUpdate({ key: apiKey },{ $inc: { requestCount: 1 } })
      .then(key => {
        if (key) {
          res.locals.key = key;
          next();
        } else {
          return res.status(401).json(ERROR_JSON);
        }
      })
      .catch(err => console.log(err));
  },
  saveRequestMetrics: (proxyReq, req, res) => {
    const newRequest = new Request({
      path: req.path,
      httpMethod: req.method,
      startTime: req._startTime,
      apiKey: res.locals.key._id
    })
      .save()
      .then(requestObject => (
        Key.findOneAndUpdate(
          { _id: res.locals.key._id },
          { $push: { requests: requestObject._id } }
        )
      ))
      .catch(err => console.log(err));
  }
};
