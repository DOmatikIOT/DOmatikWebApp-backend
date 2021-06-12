let Solicitud = require("../controllers/solicitud");
let express = require("express");
let api = express.Router();

// Rutas de la API
api.post("/solicitud/registrarSolicitud", Solicitud.registrarSolicitud);
api.put("/solicitud/editarSolicitud/:id", Solicitud.editarSolicitud);
api.post("/solicitud/buscarSolicitud/:id", Solicitud.buscarSolicitud);
api.post("/solicitud/:descripcion?", Solicitud.listaSolicitud);
api.put("/solicitud/inactivarSolicitud/:id", Solicitud.inactivarSolicitud);
module.exports = api;