
let UsuarioEspecialidad = require("../models/usuarioEspecialidad");

const crearUsuarioEspecialidad = (req, res) => {
  let params = req.body;
  let usuarioEspecialidad = new UsuarioEspecialidad();
  usuarioEspecialidad.idUsuario = params.idUsuario;
  usuarioEspecialidad.idEspecialidad = params.idEspecialidad;
  usuarioEspecialidad.idEstado = params.idEstado

  usuarioEspecialidad.save((err, guardarusuarioEspecialidad) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (usuarioEspecialidad) {
        res
          .status(200)
          .send({ usuarioEspecialidad: guardarusuarioEspecialidad });
      } else {
        res
          .status(401)
          .send({ mensaje: "No se pudo registrar usuarioEspecialidad" });
      }
    }
  });
};

const buscarUsuarioEspecialidad = (req, res) => {
  let id = req.params["id"];

  UsuarioEspecialidad.findById({ _id: id }, (err, datosUsuarioEspecialidad) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosUsuarioEspecialidad) {
        res.status(200).send({ usuarioEspecialidad: datosUsuarioEspecialidad });
      } else {
        res.status(401).send({ mensaje: "El usuarioEspecialidad no existe" });
      }
    }
  });
};

const listarUsuarioEspecialidad = (req, res) => {
  let nombre = req.params["nombre"];
  UsuarioEspecialidad.find(
    { nombre: new RegExp(nombre, "i") },
    (err, datosUsuarioEspecialidad) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosUsuarioEspecialidad) {
          res
            .status(200)
            .send({ UsuarioEspecialidad: datosUsuarioEspecialidad });
        } else {
          res.status(401).send({ mensaje: "No hay UsuarioEspecialidad" });
        }
      }
    }
  );
};

const editarUsuarioEspecialidad = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  UsuarioEspecialidad.findByIdAndUpdate(
    { _id: id },
    {
      idUsuario: params.idUsuario,
      idEspecialidad: params.idEspecialidad,
      fechaModificacion: Date.now
    },
    (err, datosUsuarioEspecialidad) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosUsuarioEspecialidad) {
          res
            .status(200)
            .send({ UsuarioEspecialidad: datosUsuarioEspecialidad });
        } else {
          res
            .status(401)
            .send({ mensaje: "El UsuarioEspecialidad no se pudo editar" });
        }
      }
    }
  );
};

const activarInactivarUsuarioEspecialidad = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  UsuarioEspecialidad.findByIdAndUpdate(
    { _id: id },
    {
      idEstado: params.idEstado,
      fechaModificacion: Date.now
    },
    (err, datosUsuarioEspecialidad) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosUsuarioEspecialidad) {
          res
            .status(200)
            .send({ UsuarioEspecialidad: datosUsuarioEspecialidad });
        } else {
          res
            .status(401)
            .send({ mensaje: "El UsuarioEspecialidad no se pudo editar" });
        }
      }
    }
  );
};

module.exports = {
  crearUsuarioEspecialidad,
  editarUsuarioEspecialidad,
  listarUsuarioEspecialidad,
  buscarUsuarioEspecialidad,
  activarInactivarUsuarioEspecialidad
};
