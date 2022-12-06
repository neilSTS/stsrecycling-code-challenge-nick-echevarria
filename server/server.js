const express = require('express');
const cors = require('cors');
require('dotenv').config();
const followersRouter = require('./routes/followersRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.options('*', cors);

app.use('/v1', followersRouter);

// Handle unknown routes
app.use((req, res) => res.sendStatus(404));

// Global Express Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express' global error handler has triggered",
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, {
    message: { err: err.message },
  });
  const errorStatus = err.status || 500;
  console.log('The global error is being invoked');
  return res.status(errorStatus).send(errorObj.message);
});

app.listen(PORT, () => console.log(`API Server is listening on port: ${PORT}`));
