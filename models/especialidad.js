let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let especialidadSchema = Schema({
  idEstado: { type: Schema.ObjectId, ref: "estado" },
  nombre: String,
  descripcion: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("especialidad",especialidadSchema);