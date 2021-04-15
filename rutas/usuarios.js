const express = require("express");
const debug = require("debug")("incidencias:incidencias");
const md5 = require("md5");
const { getUsuarios } = require("../controladores/usuarios");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { error, incidencias } = await getUsuarios(req.params.tipo, req.query);
  if (error) {
    return next(error);
  }
  return res.json(incidencias);
});

module.exports = router;
