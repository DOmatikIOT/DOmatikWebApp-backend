let jwt = require("jwt-simple");
let moment = require("moment");
let secret = "KoomblerInc2021";

exports.createToken = (usuario) => {
    let payload = {
        _id: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        tipoIdentificacion: usuario.tipoIdentificacion,
        numIdentificacion: usuario.numIdentificacion,
        email: usuario.email,
        fechaNacimiento: usuario.fechaNacimiento,
        iat: moment().unix(),
    };
    return jwt.encode(payload, secret);
};