let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Definicion del esquema de usuario
let userSchema = Schema({
    firstName: String, // Nombres
    lastName: String, // Apellidos
    email: String, // Correo electrónico
    password: String, // Contraseña
    documentType: { type: Schema.ObjectId, ref: "documentType" }, // Tipo de documento de identificación
    documentNumber: String, // Número de identificacion
    phoneNumber: String, // Número telefonico
    address: String, // Direccion
    bithDate: String, // Fecha de naciemiento
    profile: { type: Schema.ObjectId, ref: "profile" }, // Perfil
    company: { type: Schema.ObjectId, ref: "company" }, // Compañia ó empresa
    state: { type: Schema.ObjectId, ref: "state" }, // Estado
    photo: String, // Foto de imagen de perfil
    dateCreated: { type: Date, default: Date.now }, // Fecha de creación
    dateUpdated: { type: Date, default: Date.now }, // Fecha de modificación 
});

// Exportación del modulo
module.exports = mongoose.model("user",userSchema);