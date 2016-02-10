var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
var usuario = require('../models/modelUsuario.js');
var proyecto = require('../models/modelProyecto.js');

var archivoSchema = new mongoose.Schema({
  nombre: String,
  contenido: String,
  propietario: { type: Schema.ObjectId, ref: usuario }, // Llave foranea al propietario del proyecto
  proyecto: { type: Schema.ObjectId, ref: proyecto }, // Llave foranea al propietario del proyecto
  version : Number,
  commit : String,
  updated_at: { type: Date, default: Date.now },
});
// Exportamos el modelo
module.exports = mongoose.model('Archivo', archivoSchema);