// importamos el controlador de estado
let Estado = require("../models/estado");

const registrarEstado = (req, res) => {
  let params = req.body;

  let estado = new Estado();

  estado.nombre = params.nombre;
  estado.descripcion = params.descripcion;

  estado.save((err, saveEstado) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveEstado) {
        res.status(200).send({ estado: saveEstado });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar el estado" });
      }
    }
  });
};

const editarEstado = (req, res) => {
  let id = req.params["id"];
  let params = req.body;

  Estado.findByIdAndUpdate(
    { _id: id },
    { nombre: params.nombre, descripcion: params.descripcion },
    { fechaModificacion: Date.now() },
    (err, datosEstado) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEstado) {
          res.status(200).send({ estado: datosEstado });
        } else {
          res.status(401).send({ mensaje: "El estado no se pudo editar" });
        }
      }
    }
  );
};

const listarEstado = (req, res) => {
  let nombre = req.params["nombre"];

  Estado.find({ nombre: new RegExp(nombre, "i") }, (err, datosEstado) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosEstado) {
        res.status(200).send({ estado: datosEstado });
      } else {
        res.status(401).send({ mensaje: "No hay estados" });
      }
    }
  });
};

const buscarEstado = (req, res) => {
  let id = req.params["id"];
  Estado.findById({ _id: id }, (err, datosEstado) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosEstado) {
        res.status(200).send({ estado: datosEstado });
      } else {
        res.status(401).send({ mensaje: "El estado no existe" });
      }
    }
  });
};

const inactivarEstado = (req, res) => {
  let params = req.body;
  Estado.findByIdAndUpdate(
    { _id: params.id },
    { estadoSistema: false },
    (err, datosEstado) => {
      if (err) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (datosEstado) {
          res.status(200).send({ estado: "Estado Inactivo" });
        } else {
          res.status(403).send({ mensaje: "El estado no se pudo inactivar" });
        }
      }
    }
  );
};

module.exports = {
  registrarEstado,
  listarEstado,
  buscarEstado,
  editarEstado,
  inactivarEstado,
};

