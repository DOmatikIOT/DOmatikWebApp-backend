let express = require("express");
let Usuario = require("../controllers/usuario");
let api = express.Router();


api.post("/usuario/registrarUsuario", Usuario.registrarUsuario);
api.post("/usuario/login", Usuario.login);
api.put("/usuario/editarUsuario/:id", Usuario.editarUsuario);
api.put("/usuario/cambiarEstadoUsuario/", Usuario.cambiarEstadoUsuario);
api.get("/usuario/listarUsuario/:nombres?", Usuario.listarUsuario);
api.post("/usuario/listarUsuario/:nombres?", Usuario.listarUsuario);
api.get("/usuario/listarUsuarioId/:idUsuario", Usuario.listarUsuarioId);
api.post("/usuario/listarUsuarioId/:idUsuario", Usuario.listarUsuarioId);


module.exports = api;