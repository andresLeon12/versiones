
// Mostramos pagina de inicio
exports.index = function(req, res){
	if (!req.session.usuario)
		res.render('index', {
			title : '- ConVer -'
		})
	else{
		res.render('inicio', {
			title : 'ConVer - '+req.session.usuario.nombre,
			usuario : req.session.usuario
		})
	}
};

// Mostramos pagina de registro
exports.register = function(req, res){
	if (!req.session.usuario)
		res.render('registro', {
			title : 'ConVer - Registrate gratis'
		})
	else
		res.render('inicio', {
			title : 'ConVer - '+req.session.usuario.nombre,
			usuario : req.session.usuario
		})
};

// Mostramos pagina de registro
exports.login = function(req, res){
	if (!req.session.usuario)
		res.render('login', {
			title : 'ConVer - Inicia sesión'
		})
	else
		res.render('inicio', {
			title : 'ConVer - '+req.session.usuario.nombre,
			usuario : req.session.usuario
		})
};