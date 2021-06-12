let express = require("express");
let UsuarioEspecialidad = require("../controllers/usuarioEspecialidad");
let api = express.Router();

api.post(
  "/usuarioEspecialidad/crearUsuarioEspecialidad",
  UsuarioEspecialidad.crearUsuarioEspecialidad
);
api.get(
  "/usuarioEspecialidad/:id",
  UsuarioEspecialidad.buscarUsuarioEspecialidad
);
api.get("/usuarioEspecialidad/", UsuarioEspecialidad.listarUsuarioEspecialidad);
api.post(
  "/usuarioEspecialidad/:nombre?",
  UsuarioEspecialidad.listarUsuarioEspecialidad
);
api.put(
  "/usuarioEspecialidad/editarUsuarioEspecialidad/:id",
  UsuarioEspecialidad.editarUsuarioEspecialidad
);
api.put(
  "/usuarioEspecialidad/activarInactivarUsuarioEspecialidad",
  UsuarioEspecialidad.activarInactivarUsuarioEspecialidad
);
module.exports = api;
