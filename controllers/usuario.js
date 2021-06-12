let Usuario = require("../models/usuario");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");

const registrarUsuario = (req, res) => {
  let params = req.body;
  let usuario = new Usuario();
  if (
    params.idEstado &&
    params.idPerfil &&
    params.nombres &&
    params.apellidos &&
    params.telefono &&
    params.direccion &&
    params.tipoIdentificacion &&
    params.numIdentificacion &&
    params.email &&
    params.fechaNacimiento &&
    params.clave
  ) {
    bcrypt.hash(params.clave, null, null, (err, hash) => {
      if (hash) {
        usuario.idEstado = params.idEstado;
        usuario.idPerfil = params.idPerfil;
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.telefono = params.telefono;
        usuario.direccion = params.direccion;
        usuario.tipoIdentificacion = params.tipoIdentificacion;
        usuario.numIdentificacion = params.numIdentificacion;
        usuario.email = params.email;
        usuario.fechaNacimiento = params.fechaNacimiento;
        usuario.clave = hash;

        usuario.save((err, saveUsuario) => {
          if (err) {
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      }
    });
  } else {
    res.status(405).send({ err: "No se guardo un dato" });
  }
};

const login = (req, res) => {
  let params = req.body;
  Usuario.findOne({ email: params.email }, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (datosUsuario) {
        bcrypt.compare(params.clave, datosUsuario.clave, (err, successDataCompare) => {
          if (successDataCompare) {
            if (datosUsuario.idEstado) {
              if (params.getToken) {
                console.log('datosUsuario: ', datosUsuario);
                res.status(200).send({
                  jwt: jwt.createToken(datosUsuario),
                  usuario: datosUsuario,
                });
              } else {
                res
                  .status(200)
                  .send({ Usuario: datosUsuario, mensaje: "Sin token" });
              }
            } else {
              res
                .status(206)
                .send({ Usuario: datosUsuario, mensaje: "Usuario Inactivo" });
            }
          } else {
            res.status(401).send({ mensaje: "Correo o Clave erronea" });
          }
        });
      } else {
        res.status(401).send({ mensaje: "Correo o Clave erronea" });
      }
    }
  });
};

const editarUsuario = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  Usuario.findByIdAndUpdate(
    { _id: id },
    { nombres: params.nombres ,
     apellidos: params.apellidos ,
     telefono: params.telefono ,
     direccion: params.direccion ,
     tipoIdentificacion: params.tipoIdentificacion ,
     numIdentificacion: params.numIdentificacion ,
     email: params.email ,
     fechaNacimiento: params.fechaNacimiento ,
     clave: params.clave ,
    },
    (err, datosUsuario) => {
      if (err) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (datosUsuario) {
          res.status(200).send({ Usuario: datosUsuario });
        } else {
          res.status(403).send({ mensaje: "El usuario no se pudo actualizar" });
        }
      }
    }
  );
};

const cambiarEstadoUsuario = (req, res) => {
  let params = req.body;
  Usuario.findByIdAndUpdate(
    { _id: params.id },
    { idEstado: params.idEstado },
    (err, datosUsuario) => {
      if (err) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (datosUsuario) {
          res.status(200).send({ mensaje: "Usuario Inactivo" });
        } else {
          res.status(403).send({ mensaje: "El usuario no se pudo actualizar" });
        }
      }
    }
  );
};

const listarUsuario = (req, res) => {
  let nombres = req.params["nombres"];
  Usuario.find({ nombres: new RegExp(nombres, "i") }, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosUsuario) {
        res.status(200).send({ usuario: datosUsuario });
      } else {
        res.status(401).send({ mensaje: "No hay usuarios" });
      }
    }
  });
};

const listarUsuarioId = (req, res) => {
  let idUsuario = req.params["idUsuario"];
  Usuario.find({ _id: idUsuario }, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosUsuario) {
        res.status(200).send({ usuario: datosUsuario });
      } else {
        res.status(401).send({ mensaje: "No hay usuario para es id" });
      }
    }
  });
};

module.exports = {
  registrarUsuario,
  login,
  editarUsuario,
  cambiarEstadoUsuario,
  listarUsuario,
  listarUsuarioId,
};
