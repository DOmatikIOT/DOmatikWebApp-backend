let Solicitud = require("../models/solicitud");
let mongoose = require("mongoose");

const registrarSolicitud = async (req, res) => {
  let params = req.body;
  if (!params.descripcion) {
    return res
      .status(401)
      .send({ ErrorDeFront: "Falta ingresar la descripcion" });
  } else {
    let solicitud = new Solicitud({
      idUsuario: params.idUsuario,
      idEspecialidad: params.idEspecialidad,
      idEstado: params.idEstado,
      descripcion: params.descripcion,
      fechaCreacion: params.fechaCreacion,
      fechaModificacion: params.fechaModificacion,
      fechaInicio: params.fechaInicio,
      fechaFin: params.fechaFin,
    });
    const result = await solicitud.save();
    result
      ? res.status(200).send({ solicitud: result })
      : res.status(401).send({ Error: "no se pudo registrar la solicitud" });
  }
};

const buscarSolicitud = (req, res) => {
  let id = req.params["id"];
  Solicitud.findById({ _id: id }, (err, datosSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosSolicitud) {
        res.status(200).send({ solicitud: datosSolicitud });
      } else {
        res.status(401).send({ mensaje: "La solicitud no existe" });
      }
    }
  });
};

const listaSolicitud = (req, res) => {
  let descripcion = req.params["descripcion"];

  Solicitud.find(
    { descripcion: new RegExp(descripcion, "i") },
    (err, datosSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosSolicitud) {
          res.status(200).send({ solicitud: datosSolicitud });
        } else {
          res.status(401).send({ mensaje: "No hay solicitudes" });
        }
      }
    }
  );
};

const editarSolicitud = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  Solicitud.findByIdAndUpdate(
    { _id: id },
    {
      idUsuario: params.idUsuario,
      idEspecialidad: params.idEspecialidad,
      idEstado: params.idEstado,
      descripcion: params.descripcion,
      fechaCreacion: params.fechaCreacion,
      fechaModificacion: Date.now(),
      fechaInicio: params.fechaInicio,
      fechaFin: params.fechaFin,
    },
    (err, datosSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosSolicitud) {
          res.status(200).send({ solicitud: datosSolicitud });
        } else {
          res.status(401).send({ mensaje: "La solicutud no se pudo editar" });
        }
      }
    }
  );
};

const inactivarSolicitud = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  Solicitud.findByIdAndUpdate(
    { _id: id },
    { 
      idEstado: params.idEstado
    },
    (err, datosSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (datosSolicitud) {
          res.status(200).send({ mensaje: "Solicitud Inactiva" });
        } else {
          res
            .status(403)
            .send({ mensaje: "La Solicitud no se pudo inactivar" });
        }
      }
    }
  );
};

const solicitudController = {
  registrarSolicitud,
  buscarSolicitud,
  listaSolicitud,
  editarSolicitud,
  inactivarSolicitud,
};
module.exports = solicitudController;
