let Perfil = require("../controllers/perfil");
let express = require("express");

let api = express.Router();
 
api.post("/perfil/registrarPerfil", Perfil.registrarPerfil);
api.get("/perfil/listaPerfiles", Perfil.listarPerfil);
api.get("/perfil/listarPerfilAdmin", Perfil.listarPerfilAdmin);
api.get("/perfil/listarPerfil", Perfil.listarPerfil);
api.post("/perfil/:nombre?", Perfil.listarPerfil);
api.get("/perfil/:id", Perfil.buscarPerfil);
api.put("/perfil/editarPerfil/:id", Perfil.editarPerfil);
api.put("/perfil/inactivarPerfil/:id", Perfil.inactivarPerfil);

module.exports = api;