let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let solicitudSchema = Schema({
    idUsuario: { type: Schema.ObjectId, ref:"usuario" },
    idEspecialidad: { type: Schema.ObjectId, ref:"especialidad" },
    idEstado: { type: Schema.ObjectId, ref:"estado" },
    descripcion: String,
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
    fechaInicio: Number,
    fechaFin: Number,
});

module.exports = mongoose.model("solicitud", solicitudSchema);