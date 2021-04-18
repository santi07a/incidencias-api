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

router.get("/", async (req, res, next) => {
  const informeRespuesta = await getIncidencias(req.query);
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/medio-ambiente", async (req, res, next) => {
  const informeRespuesta = await getIncidencias(req.query, "Medio Ambiente");
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/civismo", async (req, res, next) => {
  const informeRespuesta = await getIncidencias(req.query, "Civismo");
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/infraestructura", async (req, res, next) => {
  const informeRespuesta = await getIncidencias(req.query, "Infraestructura");
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/otros", async (req, res, next) => {
  const informeRespuesta = await getIncidencias(req.query, "Otros");
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/:idIncidencia", async (req, res, next) => {
  const informeRespuesta = await getIncidencia(req.params.idIncidencia);
  if (informeRespuesta.error) {
    next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.post("/",
  checkSchema(getIncidenciaSchema()),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const informeRespuesta = await postIncidencia(req.body);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    } else {
      return res.status(201).json(informeRespuesta.jsonResponse);
    }
  });
router.put("/:idIncidencia",
  checkSchema(getIncidenciaSchema(true)),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const informeRespuesta = await putIncidencia(req.body, req.params.idIncidencia);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    } else {
      return res.status(201).json(informeRespuesta.jsonResponse);
    }
  });
router.delete("/:idIncidencia",
  async (req, res, next) => {
    const informeRespuesta = await borrarIncidencia(req.params.idIncidencia);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    }
    return res.json(informeRespuesta.jsonResponse);
  });

module.exports = router;
