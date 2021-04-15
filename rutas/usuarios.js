const express = require("express");
const debug = require("debug")("incidencias:usuarios");
const md5 = require("md5");
const { getUsuarios, getUsuario } = require("../controladores/usuarios");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { error, usuarios } = await getUsuarios(req.params.tipo, req.query);
  if (error) {
    return next(error);
  } else {
    res.json(usuarios);
  }
});

router.get("/usuario/:idUsuario", async (req, res, next) => {
  console.log(req);
  const idUsuario = req.params.id;
  const { usuario, error } = await getUsuario(idUsuario);
  if (error) {
    next(error);
  } else {
    res.json(usuario);
  }
});
module.exports = router;
