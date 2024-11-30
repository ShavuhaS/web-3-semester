const express = require('express');
const path = require('path');
const { apiRouter } = require('./api');

const PORT = +process.env.PORT;
const STATIC_FOLDER = path.resolve(__dirname, '../../public');

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('/page1.html');
});

app.use('/api', apiRouter);

app.use(express.static(STATIC_FOLDER));

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}...`);
});