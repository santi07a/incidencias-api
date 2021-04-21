const jwt = require("jsonwebtoken");
const { generaError } = require("../errores/errores");

const authUsuario = (req, res, next) => {
  if (!req.header("Authorization")) {
    return next(generaError("Falta el token", 403));
  }
  const token = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : "";
  try {
    const infoUsuario = jwt.verify(token, process.env.JWT_SECRET);
    req.idUsuario = infoUsuario.id;
    next();
  } catch (err) {
    return next(generaError(err.message, 403));
  }
};

module.exports = authUsuario;
