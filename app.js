var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./lib/connectMongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const LoginController = require('./controllers/LoginController');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
const i18n = require('./lib/i18nConfigure'); 
const LangController = require('./controllers/LangController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Instanciamos el controlador del login
const loginController = new LoginController();

// Instanciamos el controlado del cambio de lenguaje
const langController = new LangController();

// Rutas api
app.use('/api/productos', jwtAuthMiddleware, require('./routes/api/productos')); 
app.post('/api/authenticate', loginController.postJWT);

// Rutas website
app.use(i18n.init);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/change-locale/:locale', langController.changeLocale);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
