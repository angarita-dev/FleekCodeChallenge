const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Require middleware
const  {
  verifyAndUpdateApiKey,
  saveRequestMetrics
} = require('./middlewares/apikey');

// Connect to db
const uri = require("../config/keys").mongoURI;

mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:5001/api/v0";

app.use(morgan('dev'));

// Middleware to verify API key
app.use('', verifyAndUpdateApiKey);

// Proxy endpoints
app.use('/ipfs', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/ipfs': ''
  },
  onProxyReq: saveRequestMetrics,
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
