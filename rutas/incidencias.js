const express = require("express");
const debug = require("debug")("incidencias:incidencias");
const { checkSchema } = require("express-validator");
const { getIncidencias, postIncidencia } = require("../controladores/incidencias");
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
/* router.post("/proyecto",
  checkSchema(getProyectoSchema(true)),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const respuesta = await postProyecto(req.body);
    if (respuesta.error) {
      return next(respuesta.error);
    } else {
      return res.status(201).json(respuesta.proyecto);
    }
  }); */

module.exports = router;
