let TipoIdentificacion = require("../models/tipoIdentificacion");

const registrarTipoIdentificacion = (req, res) => {
    let params = req.body;
  
    let tipoIdentificacion = new TipoIdentificacion();
  
    // tipoIdentificacion.idEstado = "60b290c9084ecb101b56809e"; Estado activo por defecto
    tipoIdentificacion.idEstado = params.idEstado;
    tipoIdentificacion.nombre = params.nombre;
    tipoIdentificacion.descripcion = params.descripcion;
  
    tipoIdentificacion.save((err, saveTipoIdentificacion) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (saveTipoIdentificacion) {
          res.status(200).send({tipoIdentificacion : saveTipoIdentificacion });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el tipo de identificacion" });
        }
      }
    });
};

const listarTipoIdentificacion = (req, res) => {
    let nombre = req.params["nombre"];
    TipoIdentificacion.find({ nombre: new RegExp(nombre, "i") }, (err, datosTipoIdentificacion) => {
        console.log('datosTipoIdentificacion: ', datosTipoIdentificacion);
        console.log("Id estado inactivo => 60b726090ad7c316b5d7a977");
        console.log("Id estado activo => 60b290c9084ecb101b56809e");
        if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (datosTipoIdentificacion) {
                let  collectionDocumentTypes = [];
                datosTipoIdentificacion.forEach(element => {
                    if (element['idEstado'] == "60b290c9084ecb101b56809e") {
                        collectionDocumentTypes.push(element);
                    }
                });
                res.status(200).send({ tipoIdentificacion: collectionDocumentTypes });
            } else {
                res.status(401).send({ mensaje: "No hay existe tipo de identificacion" });
            }
        }
    });
};

const listarTipoIdentificacionAdmin = (req, res) => {
    let nombre = req.params["nombre"];
    TipoIdentificacion.find({ nombre: new RegExp(nombre, "i") }, (err, datosTipoIdentificacion) => {
        if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
            } else {
                res.status(401).send({ mensaje: "No hay existe tipo de identificacion" });
            }
        }
    });
};

const buscarTipoIdentificacion = (req, res) => {
    let id = req.params["id"];
    TipoIdentificacion.findById({ _id: id }, (err, datosTipoIdentificacion) => {
        if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (datosTipoIdentificacion) {
                datosTipoIdentificacion.forEach(element => {
                    if (element['_id'] === "60b290c9084ecb101b56809e") {
                        collectionDocumentTypes.push(element);
                    }
                });
                res.status(200).send({ tipoIdentificacion: collectionDocumentTypes });
            } else {
                res.status(401).send({ mensaje: "El tipo de identificacion no existe" });
            }
        }
    });
};

const buscarTipoIdentificacionAdmin = (req, res) => {
    let id = req.params["id"];
    TipoIdentificacion.findById({ _id: id }, (err, datosTipoIdentificacion) => {
        if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
        } else {
            if (datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
            } else {
                res.status(401).send({ mensaje: "El tipo de identificacion no existe" });
            }
        }
    });
};

const editarTipoIdentificacion = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);

    TipoIdentificacion.findByIdAndUpdate(
        { _id: id },
        { nombre: params.nombre, descripcion: params.descripcion, idEstado: params.idEstado },
        { fechaModificacion: Date.now() },
        (err, datosTipoIdentificacion) => {
            if (err) {
                res.status(500).send({ mensaje: "Error al conectar al servidor" });
            } else {
                if (datosTipoIdentificacion) {
                res.status(200).send({ tipoIdentificacion: datosTipoIdentificacion });
                } else {
                res.status(401).send({ mensaje: "El tipo de identificacion no se pudo editar" });
                }
            }
        }
    );
};

const inactivarTipoIdentificacion = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    TipoIdentificacion.findByIdAndUpdate(
        { _id: id },
        { nombre: params.nombre, descripcion: params.descripcion, idEstado: "60b726090ad7c316b5d7a977" },
        (err, datosTipoIdentificacion) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                if (datosTipoIdentificacion) {
                    res.status(200).send({ tipoIdentificacion: "Tipo de identificacion Inactivo" });
                } else {
                    res.status(403).send({ mensaje: "El tipo de identificacion no se pudo inactivar" });
                }
            }
        }
    );
};
  module.exports = {
    registrarTipoIdentificacion,
    listarTipoIdentificacion,
    listarTipoIdentificacionAdmin,
    buscarTipoIdentificacion,
    buscarTipoIdentificacionAdmin,
    editarTipoIdentificacion,
    inactivarTipoIdentificacion,
  };
  