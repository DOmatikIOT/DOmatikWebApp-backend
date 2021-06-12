let Perfil = require("../models/perfil");

const registrarPerfil = (req, res) => {
    let params = req.body;
  
    let perfil = new Perfil();
  
    perfil.nombre = params.nombre;
    perfil.descripcion = params.descripcion;
    perfil.idEstado = params.idEstado;
  
    perfil.save((err, savePerfil) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (savePerfil) {
          res.status(200).send({perfil : savePerfil });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el perfil" });
        }
      }
    });
};

const listarPerfil = (req, res) => {
  let nombre = req.params["nombre"];
  Perfil.find({ nombre: new RegExp(nombre, "i") }, (err, datosPerfil) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosPerfil) {
        let coleccionPerfiles = [];
        datosPerfil.forEach(element => {
          if (
            element.nombre !== "Admin" && 
            element.nombre !== "Administrador" && 
            element.nombre !== "admin" && 
            element.nombre !== "administrador" && 
            element['idEstado'] == "60b290c9084ecb101b56809e"
          ) {
            coleccionPerfiles.push(element);
          }
        });
        res.status(200).send({ perfil: coleccionPerfiles });
      } else {
        res.status(401).send({ mensaje: "No hay perfil" });
      }
    }
  });
};

const buscarPerfil = (req, res) => {
  let id = req.params["id"];
  Perfil.findById({ _id: id }, (err, datosPerfil) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosPerfil) {
        res.status(200).send({ perfil: datosPerfil });
      } else {
        res.status(401).send({ mensaje: "El perfil no existe" });
      }
    }
  });
};

const editarPerfil = (req, res) => {
  let id = req.params["id"];
  let params = req.body;

  Perfil.findByIdAndUpdate(
    { _id: id },
    { nombre: params.nombre, descripcion: params.descripcion, idEstado: params.idEstado },
    { fechaModificacion: Date.now() },
    (err, datosPerfil) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosPerfil) {
          res.status(200).send({ perfil: datosPerfil });
        } else {
          res.status(401).send({ mensaje: "El perfil no se pudo editar" });
        }
      }
    }
  );
};

const inactivarPerfil = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  Perfil.findByIdAndUpdate(
      { _id: id },
      { nombre: params.nombre, descripcion: params.descripcion, idEstado: "60b726090ad7c316b5d7a977" },
      (err, datosPerfil) => {
          if (err) {
              res.status(500).send({ mensaje: "Error en el servidor" });
          } else {
              if (datosPerfil) {
                  res.status(200).send({ tipoIdentificacion: "Perfil Inactivo" });
              } else {
                  res.status(403).send({ mensaje: "El perfil no se pudo inactivar" });
              }
          }
      }
  );
};

const listarPerfilAdmin = (req, res) => {
  let nombre = req.params["nombre"];
  Perfil.find({ nombre: new RegExp(nombre, "i") }, (err, datosPerfil) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosPerfil) {
        res.status(200).send({ perfil: datosPerfil });
      } else {
        res.status(401).send({ mensaje: "No hay perfil" });
      }
    }
  });
};

module.exports = {
  registrarPerfil,
  listarPerfil,
  listarPerfilAdmin,
  buscarPerfil,
  editarPerfil,
  inactivarPerfil,
};
  