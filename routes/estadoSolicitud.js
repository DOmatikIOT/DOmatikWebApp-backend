
let EstadoSolicitud = require("../controllers/estadoSolicitud");
let express = require("express");
// Creamos la api para controlar las rutas
let api = express.Router();
 
// Rutas de la API
api.post("/estadoSolicitud/registrarEstado", EstadoSolicitud.registrarEstadoSolicitud);
api.put("/estadoSolicitud/editarEstado/:id", EstadoSolicitud.editarEstadoSolicitud);
api.put("/estadoSolicitud/inactivarEstado/:id", EstadoSolicitud.inactivarEstadoSolicitud);
api.get("/estadoSolicitud/:id", EstadoSolicitud.buscarEstadoSolicitud);
api.get("/estadoSolicitud/:nombre?", EstadoSolicitud.listarEstadoSolicitud);
api.post("/estadoSolicitud/:nombre?", EstadoSolicitud.listarEstadoSolicitud);

module.exports = api;