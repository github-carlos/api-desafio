import * as createError from 'http-errors'
import express from 'express';
import logger from 'morgan'

export const app = express();

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const server = new Server(app)

// server.listen(process.env.PORT || 3000)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Application started')
})