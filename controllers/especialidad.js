let Especialidad = require("../models/especialidad");
let moment = require("moment");

const crearEspecialidad = (req, res) => {
  let params = req.body;
  let especialidad = new Especialidad();
  especialidad.idEstado = params.idEstado;
  especialidad.nombre = params.nombre;
  especialidad.descripcion = params.descripcion;

  especialidad.save((err, guardarEspecialidad) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (guardarEspecialidad) {
        res.status(200).send({ especialidad: guardarEspecialidad });
      } else {
        res
          .status(401)
          .send({ mensaje: "No se pudo registrar la especialidad" });
      }
    }
  });
};

const buscarEspecialidad = (req, res) => {
  let id = req.params["id"];

  Especialidad.findById({ _id: id }, (err, datosEspecialidad) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosEspecialidad) {
        res.status(200).send({ especialidad: datosEspecialidad });
      } else {
        res.status(401).send({ mensaje: "La especialidad no existe" });
      }
    }
  });
};

const listarEspecialidad = (req, res) => {
  let nombre = req.params["nombre"];

  Especialidad.find(
    { nombre: new RegExp(nombre, "i") },
    (err, datosEspecialidad) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEspecialidad) {
          let  collectionSpecialties = [];
          datosEspecialidad.forEach(element => {
              if (element['idEstado'] == "60b290c9084ecb101b56809e") {
                  collectionSpecialties.push(element);
              }
          });
          res.status(200).send({ especialidad: collectionSpecialties });
        } else {
          res.status(401).send({ mensaje: "No hay especialidads" });
        }
      }
    }
  );
};


const listarEspecialidadAdmin = (req, res) => {
  let nombre = req.params["nombre"];
  Especialidad.find({ nombre: new RegExp(nombre, "i") }, (err, datosEspecialidad) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosEspecialidad) {
        res.status(200).send({ Especialidad: datosEspecialidad });
      } else {
        res.status(401).send({ mensaje: "No hay especialidades" });
      }
    }
  });
};

const editarEspecialidad = (req, res) => {
  let id = req.params["id"];

  let params = req.body;

  Especialidad.findByIdAndUpdate(
    { _id: id },
    {
      nombre: params.nombre,
      descripcion: params.descripcion,
    },
    { fechaModificacion: Date.now() },
    (err, datosEspecialidad) => {
      if (err) {
        res.status(500).send({
          mensaje: err + " especialidad Error al conectar al servidor",
        });
      } else {
        if (datosEspecialidad) {
          res.status(200).send({ especialidad: datosEspecialidad });
        } else {
          res.status(401).send({
            mensaje: "especialidad La especialidad no se pudo editar",
          });
        }
      }
    }
  );
};

const inactivarEspecialidad = (req, res) => {
  let id = req.params["id"];

  let params = req.body;

  Especialidad.findByIdAndUpdate(
    { _id: id },
    {
      idEstado: params.idEstado,
    },
    { fechaModificacion: Date.now() },
    (err, datosEspecialidad) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosEspecialidad) {
          res.status(200).send({ especialidad: datosEspecialidad });
        } else {
          res.status(401).send({ mensaje: "La categoría no se pudo editar" });
        }
      }
    }
  );
};

// const eliminarespecialidad = (req, res) => {

//   let id = req.params["id"];

//   especialidad.findByIdAndDelete({ _id: id }, (err, datosEspecialidad) => {
//     if (err) {
//       res.status(500).send({ mensaje: "Error al conectar al servidor" });
//     } else {
//       if (datosEspecialidad) {
//         res.status(200).send({ especialidad: datosEspecialidad });
//       } else {
//         res.status(401).send({ mensaje: "La categoría no se pudo eliminar" });
//       }
//     }
//   });
// };

const especialidadController = {
  crearEspecialidad,
  buscarEspecialidad,
  editarEspecialidad,
  listarEspecialidad,
  listarEspecialidadAdmin,
  inactivarEspecialidad,
};

module.exports = especialidadController;
