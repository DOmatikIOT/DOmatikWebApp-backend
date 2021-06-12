let TipoIdentificacion = require("../controllers/tipoIdentificacion");
let express = require("express");

let api = express.Router();
 
api.post("/tipoIdentificacion/registrarTipoIdentificacion", TipoIdentificacion.registrarTipoIdentificacion);
api.get("/tipoIdentificacion/listaTipoIdentificaciones", TipoIdentificacion.listarTipoIdentificacion);
api.get("/tipoIdentificacion/listaTipoIdentificacionesAdmin", TipoIdentificacion.listarTipoIdentificacionAdmin);
api.post("/tipoIdentificacion/:nombre?", TipoIdentificacion.listarTipoIdentificacion);
api.get("/tipoIdentificacion/:id", TipoIdentificacion.buscarTipoIdentificacion);
api.get("/tipoIdentificacionAdmin/:id", TipoIdentificacion.buscarTipoIdentificacionAdmin);
api.put("/tipoIdentificacion/editarTipoIdentificacion/:id", TipoIdentificacion.editarTipoIdentificacion);
api.put("/tipoIdentificacion/inactivarTipoIdentificacion/:id", TipoIdentificacion.inactivarTipoIdentificacion);

module.exports = api;