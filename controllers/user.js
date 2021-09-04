let User = require("../models/user");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");

const userSignUp = (req, res) => {
  let params = req.body;
  let _user = new User();
  if (
    params.firstName &&
    params.lastName &&
    params.email &&
    params.password &&
    params.documentType &&
    params.documentNumber &&
    params.phoneNumber &&
    params.address &&
    params.bithDate &&
    params.profile && 
    params.company && 
    params.state
  ) {
    bcrypt.hash(params.clave, null, null, (err, hash) => {
      if (hash) {
        _user.firstName = params.firstName;
        _user.lastName = params.lastName;
        _user.email = params.email;
        _user.password = hash;
        _user.documentType = params.documentType;
        _user.documentNumber = params.documentNumber;
        _user.phoneNumber = params.phoneNumber;
        _user.address = params.address;
        _user.bithDate = params.bithDate;
        _user.profile = params.profile;
        _user.company = params.company;
        _user.state = params.state;
        _user.photo = params.photo;
        _user.save((err, saveUser) => {
          if (err) {
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            res.status(200).send({ user: saveUser });
          }
        });
      }
    });
  } else {
    res.status(405).send({ err: "No se guardo un dato" });
  }
};

const userSignIn = (req, res) => {
  let params = req.body;
  User.findOne({ email: params.email }, (err, dataUser) => {
    if (err) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (dataUser) {
        bcrypt.compare(params.password, dataUser.password, (err, successDataCompare) => {
          if (successDataCompare) {
            if (dataUser.state) {
              if (params.getToken) {
                console.log('dataUser: ', dataUser);
                res.status(200).send({
                  jwt: jwt.createToken(dataUser),
                  user: dataUser,
                });
              } else {
                res.status(200).send({ user: dataUser, mensaje: "Sin token" });
              }
            } else {
              res.status(206).send({ user: dataUser, mensaje: "Usuario Inactivo" });
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

// const editarUsuario = (req, res) => {
//   let id = req.params["id"];
//   let params = req.body;
//   Usuario.findByIdAndUpdate(
//     { _id: id },
//     { nombres: params.nombres ,
//      apellidos: params.apellidos ,
//      telefono: params.telefono ,
//      direccion: params.direccion ,
//      tipoIdentificacion: params.tipoIdentificacion ,
//      numIdentificacion: params.numIdentificacion ,
//      email: params.email ,
//      fechaNacimiento: params.fechaNacimiento ,
//      clave: params.clave ,
//     },
//     (err, datosUsuario) => {
//       if (err) {
//         res.status(500).send({ mensaje: "Error en el servidor" });
//       } else {
//         if (datosUsuario) {
//           res.status(200).send({ Usuario: datosUsuario });
//         } else {
//           res.status(403).send({ mensaje: "El usuario no se pudo actualizar" });
//         }
//       }
//     }
//   );
// };

// const cambiarEstadoUsuario = (req, res) => {
//   let params = req.body;
//   Usuario.findByIdAndUpdate(
//     { _id: params.id },
//     { idEstado: params.idEstado },
//     (err, datosUsuario) => {
//       if (err) {
//         res.status(500).send({ mensaje: "Error en el servidor" });
//       } else {
//         if (datosUsuario) {
//           res.status(200).send({ mensaje: "Usuario Inactivo" });
//         } else {
//           res.status(403).send({ mensaje: "El usuario no se pudo actualizar" });
//         }
//       }
//     }
//   );
// };

// const listarUsuario = (req, res) => {
//   let nombres = req.params["nombres"];
//   Usuario.find({ nombres: new RegExp(nombres, "i") }, (err, datosUsuario) => {
//     if (err) {
//       res.status(500).send({ mensaje: "Error al conectar al servidor" });
//     } else {
//       if (datosUsuario) {
//         res.status(200).send({ usuario: datosUsuario });
//       } else {
//         res.status(401).send({ mensaje: "No hay usuarios" });
//       }
//     }
//   });
// };

// const listarUsuarioId = (req, res) => {
//   let idUsuario = req.params["idUsuario"];
//   Usuario.find({ _id: idUsuario }, (err, datosUsuario) => {
//     if (err) {
//       res.status(500).send({ mensaje: "Error al conectar al servidor" });
//     } else {
//       if (datosUsuario) {
//         res.status(200).send({ usuario: datosUsuario });
//       } else {
//         res.status(401).send({ mensaje: "No hay usuario para es id" });
//       }
//     }
//   });
// };

const userTest = (req, res) => {
  // let params = req.body;
  // let nombres = req.params["nombres"];
  // console.log('params: ', params);
  res.status(200).send({ mensaje: "Datos recibidos", datosqueenviaste: {} });
}

module.exports = {
  userSignUp,
  userSignIn,
  // editarUsuario,
  // cambiarEstadoUsuario,
  // listarUsuario,
  // listarUsuarioId,
  userTest,
};
