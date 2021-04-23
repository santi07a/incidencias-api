const express = require("express");
const debug = require("debug")("incidencias:incidencias");
const { checkSchema } = require("express-validator");
const md5 = require("md5");
const {
  getIncidencias, getIncidencia, postIncidencia, putIncidencia, borrarIncidencia, votaIncidencia
} = require("../controladores/incidencias");
const { getIncidenciaSchema } = require("../schemas/incidenciaSchema");
const { generaError, badRequestError } = require("../errores/errores");
const admin = require("firebase-admin");
const multer = require("multer");
const serviceAccount = require("../proyecto-final-c019d-firebase-adminsdk-444yf-f7034bca75.json");
const authUsuario = require("../middlewares/authUsuario");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "proyecto-final-c019d.appspot.com"
});

const bucket = admin.storage().bucket();

const router = express.Router();

router.get("/", async (req, res, next) => {
  const informeRespuesta = await getIncidencias(req.query);
  if (informeRespuesta.error) {
    return next(informeRespuesta.error);
  } else {
    return res.json(informeRespuesta.jsonResponse);
  }
});
router.get("/:idIncidencia",
  authUsuario,
  async (req, res, next) => {
    const informeRespuesta = await getIncidencia(req.params.idIncidencia);
    if (informeRespuesta.error) {
      next(informeRespuesta.error);
    } else {
      return res.json(informeRespuesta.jsonResponse);
    }
  });
router.post("/",
  authUsuario,
  multer().single("fotoIncidencia"),
  checkSchema(getIncidenciaSchema()),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const informeRespuesta = await postIncidencia(req.body, req.file.originalname, req.idUsuario);
    const datos = bucket.file(informeRespuesta.jsonResponse.body.incidencia.fotoIncidencia);
    const existe = await datos.exists();
    const ficheroFB = datos.createWriteStream({ resumable: false });
    if (req.file) {
      ficheroFB.end(req.file.buffer);
      ficheroFB.on("error", err => {
        const error = generaError("no se pudo guardar tu imagen", 418)
        if (err)
          return error
      })
      ficheroFB.on("finish", () => {
        console.log(`el archivo con url : https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media se cargó correctamente`);
      });
    }
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    } else {
      return res.status(201).json(informeRespuesta.jsonResponse);
    }
  })
router.put("/:idIncidencia",
  authUsuario,
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
router.patch("/votar",
  authUsuario,
  async (req, res, next) => {
    const informeRespuesta = await votaIncidencia(req.idUsuario, req.body.idIncidencia);
    if (informeRespuesta.error) {
      next(informeRespuesta.error);
    } else {
      res.json(informeRespuesta.jsonResponse);
    }
  });
router.delete("/:idIncidencia",
  authUsuario,
  async (req, res, next) => {
    const informeRespuesta = await borrarIncidencia(req.params.idIncidencia);
    if (informeRespuesta.error) {
      return next(informeRespuesta.error);
    }
    return res.json(informeRespuesta.jsonResponse);
  });


module.exports = router;
