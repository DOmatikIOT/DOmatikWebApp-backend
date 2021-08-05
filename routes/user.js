let express = require("express");
let User = require("../controllers/user");
let api = express.Router();

api.post("/user/sign-up", User.userSignUp);
api.post("/user/sign-in", User.userSignIn);
// api.put("/user/editarUsuario/:id", User.editarUsuario);
// api.put("/user/cambiarEstadoUsuario/", User.cambiarEstadoUsuario);
// api.get("/user/listarUsuario/:nombres?", User.listarUsuario);
// api.post("/user/listarUsuario/:nombres?", User.listarUsuario);
// api.get("/user/listarUsuarioId/:idUsuario", User.listarUsuarioId);
// api.post("/user/listarUsuarioId/:idUsuario", User.listarUsuarioId);

api.post("/test/envioPrueba", User.userTest);

module.exports = api;