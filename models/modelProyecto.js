var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
var usuario = require('../models/modelUsuario.js');

var proyectoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  propietario: { type: Schema.ObjectId, ref: usuario }, // Llave foranea al propietario del proyecto
  updated_at: { type: Date, default: Date.now },
});
// Exportamos el modelo
module.exports = mongoose.model('Proyecto', proyectoSchema);