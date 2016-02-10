var mongoose = require('mongoose');
var Proyecto = require('../models/modelProyecto.js');
var Archivo = require('../models/modelArchivo.js');

// Mostramos pagina de todos los proyectos
exports.renderAll = function(req, res){
	if (!req.session.usuario)
		res.redirect('/')
	else{
		var usuario = req.session.usuario
		// Buscamos todos los proyectos de este usuario
		Proyecto.find({propietario : usuario._id}, function(err, response){
			res.render('proyectos/misproyectos', {
				title : 'ConVer - Proyectos -'+req.session.usuario.nombre,
				usuario : req.session.usuario,
				proyectos : response
			})
		})
		
	}
};

// Mostramos formulario de nuevo proyecto
exports.renderNuevo = function(req, res){
	if (!req.session.usuario)
		res.redirect('/')
	else
		res.render('proyectos/nuevoproyecto', {
			title : 'ConVer - Nuevo proyecto -'+req.session.usuario.nombre,
			usuario : req.session.usuario
		})
};

// Nuevo proyecto
exports.nuevo = function(req, res){
	var proyecto = {
		nombre : req.body.nombre,
		descripcion : req.body.descripcion,
		propietario : req.session.usuario._id
	}
	var nuevoProyecto = new Proyecto(proyecto);//creamos un nuevo objeto que lleva como info el parametro todo de la funcion
			//ahora guardaremos en la bd el obejto
	nuevoProyecto.save(function(err,response){
		if (err) {
			//si hay un error, devolvemos el callback con el error devuelto
			res.json({
                status: false,
                message: "Lo sentimos ha ocurrido un error, inténtelo nuevamente.",
                error: err
            });
		}else{
			// Creamos un directorio para el proyecto
			var fs = require('fs');
			var Ruta = "./public/"+req.session.usuario.correo+'/';
			var NombreCarpeta = req.body.nombre;
			  //Se valida, Si la carpeta ya fue creada
			if(!fs.existsSync(String(Ruta+NombreCarpeta) )){
			    fs.mkdirSync(String(Ruta+NombreCarpeta), 0777, function(err){
			    });
			}
			res.redirect('/misproyectos')
		}
	});	
};

// Mostramos pagina de un proyecto
exports.renderOne = function(req, res){
	if (!req.session.usuario)
		res.redirect('/')
	else{
		var proyecto = req.params.idp
		// Buscamos todos los proyectos de este usuario
		Proyecto.findById(proyecto, function(err, response){
			Archivo.find({proyecto: response._id}, function(er, resp){
				proyectos = resp
				var commits = []
				var archivos = []
				for (i=0;i<proyectos.length;i++){
					if(commits.indexOf(proyectos[i].commit) < 0 && proyectos[i].commit != '')
						commits[commits.length] = proyectos[i].commit
					if(proyectos[i].commit == '')
						archivos[archivos.length] = proyectos[i]
				}
				res.render('proyectos/proyecto', {
					title : 'ConVer - Proyecto -'+response.nombre,
					usuario : req.session.usuario,
					proyecto : response,
					archivos: archivos,
					commits: commits
				})
			})
		})
		
	}
};

// Nuevo archivo
exports.nuevoArchivo = function(req, res){
	var archivo = {
		nombre : req.body.nombre,
		contenido : '',
		propietario : req.session.usuario._id,
		proyecto : req.body.proyecto,
		version : 0,
		commit : ''
	}
	var nuevoArchivo = new Archivo(archivo);//creamos un nuevo objeto que lleva como info el parametro todo de la funcion
			//ahora guardaremos en la bd el obejto
	nuevoArchivo.save(function(err,response){
		if (err) {
			//si hay un error, devolvemos el callback con el error devuelto
			res.json({
                status: false,
                message: "Lo sentimos ha ocurrido un error, inténtelo nuevamente.",
                error: err
            });
		}else{
			// Creamos un directorio para el proyecto
			res.redirect('/editar/'+response._id)
		}
	});	
};

// Mostramos pagina de un proyecto
exports.renderEditor = function(req, res){
	if (!req.session.usuario)
		res.redirect('/')
	else{
		var idfile = req.params.idf;
		// Buscamos todos los proyectos de este usuario
		Archivo.findById(idfile, function(err, response){
			res.render('proyectos/editor', {
				title : 'ConVer - Proyecto -'+response.nombre,
				usuario : req.session.usuario,
				archivo : response
			})
		})
	}
};

exports.guardar = function(req, res){
	Archivo.findById(req.body.idf, function(err, response){
		response.contenido = req.body.contenido;
		response.save(function(err,response){
			res.end()
		});
	})
};

// Mostramos pagina de un proyecto
exports.getContenido = function(req, res){
		var idfile = req.params.idf;
		// Buscamos todos los proyectos de este usuario
		Archivo.findById(idfile, function(err, response){
			res.json( {
				contenido : response
			})
		})
};

// Nuevo commit
exports.nuevoCommit = function(req, res){
	var proyecto = req.body.proyecto
	var nombre_commit = req.body.nombre
	Archivo.find({proyecto: proyecto}, function(err, response){
		proyectos = response
		for (i=0;i<proyectos.length;i++){
			var proyecto = proyectos[i]
			if(proyecto.commit!='')
				continue
			var archivo = {
				nombre: proyecto.nombre,
				contenido: proyecto.contenido,
				propietario: proyecto.propietario, // Llave foranea al propietario del proyecto
				proyecto: proyecto.proyecto, // Llave foranea al propietario del proyecto
				version : proyecto.version + 0.1,
				commit : req.body.nombre,
			}
			proy = new Archivo(archivo)
			proy.save(function(err, respu){
			})
		}
	})
	res.redirect('/proyecto/'+proyecto)
};

// Mostramos los commits
exports.getArchivosCommit = function(req, res){
	if (!req.session.usuario)
		res.redirect('/')
	else{
		var proyecto = req.params.idp
		var nombre = req.params.nombre
		// Buscamos todos los proyectos de este usuario
		Proyecto.findById(proyecto, function(err, response){
			Archivo.find({proyecto: proyecto, commit:nombre}, function(err, resp){
				res.render("proyectos/commit",{
					title : 'ConVer - Proyecto -'+response.nombre,
					usuario : req.session.usuario,
					proyecto : response,
					archivos: resp,
					commit: nombre
				})
			})
		})
	}
};