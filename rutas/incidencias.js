const express = require("express");
const debug = require("debug")("incidencias:incidencias");
const { checkSchema } = require("express-validator");
const md5 = require("md5");
const {
  getIncidencias, getIncidencia, postIncidencia, putIncidencia, borrarIncidencia
} = require("../controladores/incidencias");
const { getIncidenciaSchema } = require("../schemas/incidenciaSchema");
const { generaError, badRequestError } = require("../errores/errores");

const router = express.Router();

const estructuraBase = incidencias => ({
  total: incidencias.length,
  datos: incidencias
});

router.get("/", async (req, res, next) => {
  const { error, incidencias } = await getIncidencias(req.query);
  if (error) {
    return next(error);
  }
  return res.json(estructuraBase(incidencias));
});
router.get("/:idIncidencia", async (req, res, next) => {
  const id = req.params.idIncidencia;
  const { incidencia, error } = await getIncidencia(id);
  if (error) {
    next(error);
  } else {
    res.json(estructuraBase(incidencia));
  }
});

router.post("/",
  checkSchema(getIncidenciaSchema()),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const respuesta = await postIncidencia(req.body);
    if (respuesta.error) {
      return next(respuesta.error);
    } else {
      return res.status(201).json(respuesta.incidencia);
    }
  });
router.put("/:idIncidencia",
  checkSchema(getIncidenciaSchema(true)),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const respuesta = await putIncidencia(req.body, req.params.idIncidencia);
    if (respuesta.error) {
      return next(respuesta.error);
    } else {
      return res.status(201).json(respuesta.incidencia);
    }
  });
router.delete("/:idIncidencia",
  async (req, res, next) => {
    const respuesta = await borrarIncidencia(req.params.idIncidencia);
    if (respuesta.error) {
      return next(respuesta.error);
    }
    return res.json(respuesta.incidencia);
  });

module.exports = router;
