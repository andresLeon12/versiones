// Conexión a BD
var mongoose = require('mongoose');
var Usuario = require('../models/modelUsuario.js');

exports.register = function(req, res){
	var nuevoUsuario = new Usuario(req.body);//creamos un nuevo objeto que lleva como info el parametro todo de la funcion
			//ahora guardaremos en la bd el obejto
	nuevoUsuario.save(function(err,response){
		if (err) {
			//si hay un error, devolvemos el callback con el error devuelto
			res.json({
                status: false,
                message: "Lo sentimos ha ocurrido un error, inténtelo nuevamente.",
                error: err
            });
		}else{
			//si no hay error
			req.session.usuario = response // guardamos una variable de sesion
			req.session.save()
			// Creamos un directorio para el usuario
			var fs = require('fs');
			var Ruta = "./public/";
			var NombreCarpeta = req.body.correo;
			  //Se valida, Si la carpeta ya fue creada
			if(!fs.existsSync(String(Ruta+NombreCarpeta) )){
			    fs.mkdirSync(String(Ruta+NombreCarpeta), 0777, function(err){
			    });
			}
			res.redirect('/')
		}
	});	
};

// Login
exports.login = function(req, res){
	Usuario.findOne({correo:req.body.correo, password:req.body.password}, function(err, response){
		if (err) {
			//si hay un error, devolvemos el callback con el error devuelto
			res.json({
                status: false,
                message: "Lo sentimos ha ocurrido un error, inténtelo nuevamente.",
                error: err
            });
		}else{
			//si no hay error
			req.session.usuario = response // guardamos una variable de sesion
			req.session.save()
			res.redirect('/')
		}
	})
};