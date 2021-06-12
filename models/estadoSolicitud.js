let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let estadoSolicitudSchema=Schema ({
    idUsuario: { type: Schema.ObjectId, ref: "usuario" },
    idEstado: { type: Schema.ObjectId, ref: "estado" },
    observaciones: String,
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("estadoSolicitud", estadoSolicitudSchema);