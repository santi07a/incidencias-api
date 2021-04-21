const express = require("express");
const { checkSchema } = require("express-validator");
const debug = require("debug")("incidencias:usuarios");
const {
  getUsuarios, getUsuario, postUsuario, putUsuario, borrarUsuario, loginUsuario
} = require("../controladores/usuarios");
const { badRequestError } = require("../errores/errores");
const { getUsuarioSchemaCompleto, getUsuarioSchemaParcial } = require("../schemas/usuarioSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const informeRespuesta = await getUsuarios(req.query);
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/:idUsuario", async (req, res, next) => {
  const informeRespuesta = await getUsuario(req.params.idUsuario);
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.post("/login", async (req, res, next) => {
  const { email, contrasenya } = req.body;
  const { error, usuario } = await loginUsuario(email, contrasenya);
  if (error) {
    next(error);
  } else {
    res.json({ token: usuario });
  }
});
router.post("/",
  checkSchema(getUsuarioSchemaCompleto),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const informeRespuesta = await postUsuario(req.body);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    } else {
      return res.status(201).json(informeRespuesta.jsonResponse);
    }
  });
router.put("/:idUsuario",
  checkSchema(getUsuarioSchemaCompleto),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const informeRespuesta = await putUsuario(req.body, req.params.idUsuario);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    } else {
      return res.status(201).json(informeRespuesta.jsonResponse);
    }
  });
router.delete("/:idUsuario",
  async (req, res, next) => {
    const informeRespuesta = await borrarUsuario(req.params.idUsuario);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    }
    return res.json(informeRespuesta.jsonResponse);
  });

module.exports = router;
