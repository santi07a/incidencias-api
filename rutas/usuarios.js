const express = require("express");
const { checkSchema } = require("express-validator");
const debug = require("debug")("incidencias:usuarios");
const md5 = require("md5");
const { getUsuarios, getUsuario, crearUsuario } = require("../controladores/usuarios");
const { badRequestError } = require("../errores/errores");
const { getUsuarioSchemaCompleto, getUsuarioSchemaParcial } = require("../schemas/usuarioSchema");

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

router.post("/usuario", checkSchema(getUsuarioSchemaCompleto),
  async (req, res, next) => {
    const error400 = badRequestError(req);
    if (error400) {
      return next(error400);
    }
    const nuevoUsuario = req.body;
    const { usuario, error } = await crearUsuario(nuevoUsuario);
    if (error) {
      next(error);
    } else {
      res.status(201).json({ id: usuario.id });
    }
  });
module.exports = router;
