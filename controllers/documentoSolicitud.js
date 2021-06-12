let DocumentoSolicitud = require("../models/documentoSolicitud");
let mongoose = require("mongoose");

const registrarDocumentoSolicitud = (req, res) => {
  let params = req.body;
  let documentoSolicitud = new DocumentoSolicitud();

  documentoSolicitud.idEstadoSolicitud = params.idEstadoSolicitud;
  documentoSolicitud.idEstado = params.idEstado;
  documentoSolicitud.nombre= params.nombre,
  documentoSolicitud.descripcion = params.descripcion,
  documentoSolicitud.extensionArchivo = params.extensionArchivo,
  documentoSolicitud.fechaCreacion = Date.now(),
  documentoSolicitud.fechaCreacion = Date.now(),
  
  documentoSolicitud.save((err, saveDocumentoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveDocumentoSolicitud) {
        res.status(200).send({ documentoSolicitud: saveDocumentoSolicitud });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar el documento" });
      }
    }
  });
};

const editarDocumentoSolicitud = (req, res) => {
  let id = req.params["id"];
  let params = req.body;

  DocumentoSolicitud.findByIdAndUpdate(
    { _id: id },
    { 
      idEstadoSolicitud: params.idEstadoSolicitud, 
      idEstado: params.idEstado, 
      nombre: params.nombre,
      descripcion: params.descripcion,
      extensionArchivo: params.extensionArchivo,
      fechaCreacion: params.fechaCreacion,
      fechaModificacion: Date.now(),
    },
    (err, datosDocumentoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosDocumentoSolicitud) {
          res.status(200).send({ documentoSolicitud: datosDocumentoSolicitud });
        } else {
          res.status(401).send({ mensaje: "El documentoSolicitud no se pudo editar" });
        }
      }
    }
  );
};


const listarDocumentoSolicitud = (req, res) => {
  let nombre = req.params["nombre"];

  DocumentoSolicitud.find(
    { nombre: new RegExp(nombre, "i") },
    (err, datosDocumentoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor dd" });
      } else {
        if (datosDocumentoSolicitud) {
          res.status(200).send({ documentoSolicitud: datosDocumentoSolicitud });
        } else {
          res.status(401).send({ mensaje: "No hay documentos de solicitudes" });
        }
      }
    }
  );
};

const buscarDocumentoSolicitud = (req, res) => {
  let id = req.params["id"];
  DocumentoSolicitud.findById({ _id: id }, (err, datosDocumentoSolicitud) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor ds" });
    } else {
      if (datosDocumentoSolicitud) {
        res.status(200).send({ estado: datosDocumentoSolicitud });
      } else {
        res.status(401).send({ mensaje: "El dicumento no existe" });
      }
    }
  });
};

const inactivarDocumentoSolicitud = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  DocumentoSolicitud.findByIdAndUpdate(
    { _id: id },
    { 
      idEstado: params.idEstado,
    },
    (err, datosDocumentoSolicitud) => {
      if (err) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (datosDocumentoSolicitud) {
          res.status(200).send({ estado: "El documento de solicitud inactivo" });
        } else {
          res.status(403).send({ mensaje: "El documento de solicitud no se pudo inactivar" });
        }
      }
    }
  );
};

const documentoSolicitudController = {
    registrarDocumentoSolicitud,
    listarDocumentoSolicitud,
    buscarDocumentoSolicitud,
    editarDocumentoSolicitud,
    inactivarDocumentoSolicitud,
}
module.exports = documentoSolicitudController;

