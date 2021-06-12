let EstadoSolicitud = require("../models/estadoSolicitud");

const registrarEstadoSolicitud = (req, res) => {
  let params = req.body;

  let estadoSolicitud = new EstadoSolicitud();

  estadoSolicitud.idUsuario = params.idUsuario;
  estadoSolicitud.idEstado = params.idEstado;
  estadoSolicitud.observaciones = params.observaciones;

  estadoSolicitud.save((err, saveEstadoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveEstadoSolicitud) {
        res.status(200).send({ estado: saveEstadoSolicitud });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar el estado de la Solicitud" });
      }
    }
  });
};

const editarEstadoSolicitud = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
  
    EstadoSolicitud.findByIdAndUpdate(
      { _id: id },
      { observaciones: params.observaciones ,
       fechaModificacion: Date.now(), },
      (err, datosEstadoSolicitud) => {
        if (err) {
          res.status(500).send({ mensaje: "Error al conectar al servidor"});
        } else {
          if (datosEstadoSolicitud) {
            res.status(200).send({ estadoSolicitud: datosEstadoSolicitud});
          } else {
            res.status(401).send({ mensaje: "No se pudo editar el estado de la solicitud" , mensaje1: err });
          }
        }
      }
    );
  };

  const inactivarEstadoSolicitud = (req, res) => {
    let params = req.body;
    EstadoSolicitud.findByIdAndUpdate(
      { _id: params.id },
      { idEstado: params.idEstado },
      (err, datosEstadoSolicitud) => {
        if (err) {
          res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
          if (datosEstadoSolicitud) {
            res.status(200).send({ estadoSolicitud: "Estado Inactivo" });
          } else {
            res.status(403).send({ mensaje: "El estado de la no se pudo inactivar" });
          }
        }
      }
    );
  };

  const listarEstadoSolicitud = (req, res) => {
    let nombre = req.params["nombre"];
  
    EstadoSolicitud.find({ nombre: new RegExp(nombre, "i") }, (err, datosEstadoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEstadoSolicitud) {
          res.status(200).send({ estado: datosEstadoSolicitud });
        } else {
          res.status(401).send({ mensaje: "No hay estados de solicitudes" });
        }
      }
    });
  };
  const buscarEstadoSolicitud = (req, res) => {
    let id = req.params["id"];
    EstadoSolicitud.findById({ _id: id }, (err, datosEstadoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEstadoSolicitud) {
          res.status(200).send({ estado: datosEstadoSolicitud });
        } else {
          res.status(401).send({ mensaje: "El estado de la solicitud no existe" });
        }
      }
    });
  };
  
  
module.exports = {
    registrarEstadoSolicitud,
    editarEstadoSolicitud,
    buscarEstadoSolicitud,
    inactivarEstadoSolicitud,
    listarEstadoSolicitud,
  };
  
