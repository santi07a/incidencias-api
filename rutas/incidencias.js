const express = require("express");
const debug = require("debug")("incidencias:incidencias");
const { checkSchema } = require("express-validator");
const md5 = require("md5");
const { getIncidencias, postIncidencia, putIncidencia } = require("../controladores/incidencias");
const { getIncidenciaSchema } = require("../schemas/incidenciaSchema");
const { badRequestError } = require("../errores/errores");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { error, incidencias } = await getIncidencias();
  if (error) {
    return next(error);
  }
  return res.json(incidencias);
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

module.exports = router;
