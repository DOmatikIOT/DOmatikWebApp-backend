let express = require("express");
let Especialidad  = require("../controllers/especialidad");
let api = express.Router();

api.get("/especialidad/listarEspecialidadAdmin", Especialidad.listarEspecialidadAdmin);
api.get("/especialidad/listarEspecialidad", Especialidad.listarEspecialidad);

api.post("/especialidad/crearEspecialidad",Especialidad.crearEspecialidad);
api.get("/especialidad/:id",Especialidad.buscarEspecialidad);
api.get("/especialidad",Especialidad.listarEspecialidad);
api.post("/especialidad/:nombre?",Especialidad.listarEspecialidad);
api.put("/especialidad/editarEspecialidad/:id",Especialidad.editarEspecialidad);
api.put("/especialidad/inactivarEspecialidad/:id",Especialidad.inactivarEspecialidad)
//api.delete("especialidad/eliminarEspecialidad/:id",Especialidad.eliminarespecialidad);

module.exports= api;