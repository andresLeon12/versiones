
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , session = require('express-session')
  , mongoose = require('mongoose')
  , path = require('path')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');
var fs = require('fs');

var app = express();

var controllerInicio = require('./routes/inicio');
var controllerRender = require('./routes/renders')
var controllerProyectos = require('./routes/proyectos')

// Conectamos a base de datos 
mongoose.connect('mongodb://localhost/versiones', function(err){
  if (err) {
    console.log("Error de conexion",err);
  }else{
    console.log("Conexion exitosa");
  }
});

// Configuration
app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(methodOverride());
    app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' ,keys: ['key1', 'key2']}));
    app.use(bodyParser.json());                          // parse application/json
    app.use(bodyParser.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded
    app.locals.username = null;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //console.log('Client IP:', ip);
  next();
});

// Routes

app.get('/', controllerRender.index)
app.get('/login', controllerRender.login)
app.get('/registro', controllerRender.register)
app.get('/logout', function(req, res){
  req.session.destroy();
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.redirect('/');
})

// POST
app.post('/login', controllerInicio.login)
app.post('/registro', controllerInicio.register)

// Proyectos
app.get('/misproyectos', controllerProyectos.renderAll)
app.get('/nuevoproyecto', controllerProyectos.renderNuevo)
app.post('/nuevoproyecto', controllerProyectos.nuevo)
app.get('/proyecto/:idp', controllerProyectos.renderOne)
app.post('/nuevoarchivo', controllerProyectos.nuevoArchivo)
app.post('/guardar', controllerProyectos.guardar)
app.get('/editar/:idf', controllerProyectos.renderEditor)
app.get('/contenido/:idf', controllerProyectos.getContenido)
app.post('/nuevocommit', controllerProyectos.nuevoCommit)
app.get('/commits/:idp/:nombre', controllerProyectos.getArchivosCommit)


var server = http.createServer(app);
var port = process.env.PORT || 8080;
server.listen(port, function () {
  console.log('Servidor inicializado en %d', port);
});
