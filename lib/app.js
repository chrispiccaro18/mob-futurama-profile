const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const startAt = Date.now();
  res.once('finish', () => {
    console.log(req.method, req.baseUrl, `[${res.statusCode}]`, `- ${(Date.now()) - startAt}ms`);
  });
  next();
});

app.use('/profile', require('./routes/profiles'));

app.use(require('./middleware/notFound'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
