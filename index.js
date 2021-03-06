require("dotenv").config();
const debug = require("debug")("incidencias:root");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const express = require("express");
const options = require("./parametrosCLI");
const rutasIncidencias = require("./rutas/incidencias");
const rutasUsuarios = require("./rutas/usuarios");

const {
  serverError, notFoundError, manejaErrores
} = require("./errores/errores");
const authUsuario = require("./middlewares/authUsuario");
require("./db/db");
require("./db/modelos/tipoIncidencia");

const app = express();
const puerto = process.env.HEROKU ? process.env.PORT : options.puerto || process.env.PUERTO || 5000;

const server = app.listen(puerto, () => {
  debug(chalk.yellow(`Servidor escuchando en el puerto ${puerto}`));
});

server.on("error", err => serverError(err, puerto));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/incidencias", rutasIncidencias);
app.use("/usuarios", rutasUsuarios);
app.get("/", (req, res, next) => {
  res.redirect("/incidencias");
});
app.use(notFoundError);
app.use(manejaErrores);
