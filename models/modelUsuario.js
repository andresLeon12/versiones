var mongoose = require('mongoose');

var usuarioSchema = new mongoose.Schema({
  correo: String,
  nombre: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});
// Exportamos el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);