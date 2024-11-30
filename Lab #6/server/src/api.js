const express = require('express');

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Bruh Endpoint (But not bruh)');
});

exports.apiRouter = apiRouter;