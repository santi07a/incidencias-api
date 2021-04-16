const express = require("express");
const { checkSchema } = require("express-validator");
const debug = require("debug")("incidencias:usuarios");
const nodemailer = require("nodemailer");
const {
  getUsuarios, getUsuario, crearUsuario, putUsuario, borrarUsuario
} = require("../controladores/usuarios");
const { badRequestError } = require("../errores/errores");
const { getUsuarioSchemaCompleto, getUsuarioSchemaParcial } = require("../schemas/usuarioSchema");

const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: "ciutadaverd@outlook.es",
    pass: "somdevbmns202!"
  }
});

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

router.get("/:idUsuario", async (req, res, next) => {
  const id = req.params.idUsuario;
  const { usuario, error } = await getUsuario(id);
  if (error) {
    next(error);
  } else {
    res.json(usuario);
  }
});

router.post("/", checkSchema(getUsuarioSchemaCompleto),
  async (req, res, next) => {
    const error400 = badRequestError(req);
    if (error400) {
      return next(error400);
    }
    const nuevoUsuario = req.body;
    const fecha = new Date().getTime();
    nuevoUsuario.fechaAlta = +fecha;
    const { usuario, error } = await crearUsuario(nuevoUsuario);
    if (error) {
      next(error);
    } else {
      const mensaje = {
        from: "ciutadaverd@outlook.es",
        to: usuario.email,
        subject: "confirmación registro en Ciutadá Verd",
        html: (`<h1>Su registro ha sido confirmado</h1><br/><p>Muchas gracias por registrarte con nosotros, ${usuario.nombre}. Hoy eres un ciudadano mas comprometido con el ambiente y con la ciudad.</p><br/><p style="color:#5d9b9b">Para seguir navegando en nuestra web presiona <strong style="text-decoration-line:underline">aquí</strong></p>`)
      };
      transport.sendMail(mensaje, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      res.status(201).json({ id: usuario.id });
    }
  });
router.put("/:idUsuario",
  checkSchema(getUsuarioSchemaCompleto),
  async (req, res, next) => {
    const error = badRequestError(req);
    if (error) {
      return next(error);
    }
    const respuesta = await putUsuario(req.body, req.params.idUsuario);
    if (respuesta.error) {
      return next(respuesta.error);
    } else {
      return res.status(201).json(respuesta.usuario);
    }
  });
router.delete("/:idUsuario",
  async (req, res, next) => {
    const respuesta = await borrarUsuario(req.params.idUsuario);
    if (respuesta.error) {
      return next(respuesta.error);
    }
    return res.json(respuesta.usuario);
  });

module.exports = router;
