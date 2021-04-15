const express = require("express");
const debug = require("debug")("incidencias:usuarios");
const md5 = require("md5");
const { getUsuarios, getUsuario } = require("../controladores/usuarios");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const queryParams = req.query;
  const { error, usuarios } = await getUsuarios(queryParams);
  if (error) {
    return next(error);
  } else {
    res.json(usuarios);
  }
});

router.get("/usuario/:idUsuario", async (req, res, next) => {
  const id = req.params.idUsuario;
  const { usuario, error } = await getUsuario(id);
  if (error) {
    next(error);
  } else {
    res.json(usuario);
  }
});

module.exports = router;
