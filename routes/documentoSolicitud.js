let DocumentoSolicitud = require("../controllers/documentoSolicitud");
let express = require("express");
let api = express.Router();

// Rutas de la API
api.post("/documentoSolicitud/registrarDocumentoSolicitud", DocumentoSolicitud.registrarDocumentoSolicitud);
api.put("/documentoSolicitud/editarDocumentoSolicitud/:id", DocumentoSolicitud.editarDocumentoSolicitud);
api.put("/documentoSolicitud/inactivarDocumentoSolicitud/:id", DocumentoSolicitud.inactivarDocumentoSolicitud);
api.post("/documentoSolicitud/buscarDocumentoSolicitud/:id?", DocumentoSolicitud.buscarDocumentoSolicitud);
api.post("/documentoSolicitud/listarDocumentoSolicitud/:nombre?", DocumentoSolicitud.listarDocumentoSolicitud);
module.exports = api;