// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let usuarioSchema = Schema({
    idEstado: { type: Schema.ObjectId, ref: "estado" },
    idPerfil: { type: Schema.ObjectId, ref: "perfil" },
    nombres: String,
    apellidos: String,
    telefono: String,
    direccion: String,
    tipoIdentificacion: { type: Schema.ObjectId, ref: "tipoIdentificacion" },
    numIdentificacion: String,
    email: String,
    fechaNacimiento: String,
    clave: String,
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("usuario",usuarioSchema);