const express = require('express')
const mongoose = require('./config/db')

const app = express();

const usersRouter = require('./routers/users')

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect()
}

app.use(express.json())
app.use(usersRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// Handle errors
app.use((err, req, res, next) => {
  if (!err) {
      return next();
  }

  if (err.name === 'ValidationError' || err.name === 'InvalidRequestException') {
    return res.status(400).send(err)
  }

  if (err.name === 'AuthenticationException') {
    return res.status(404).send()
  }

  console.log(err)
  res.status(500);
  res.send({ error: 'Internal server error' });
});

module.exports = app;
