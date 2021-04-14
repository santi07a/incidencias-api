require("dotenv").config();
const debug = require("debug")("incidencias:root");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const express = require("express");
const options = require("./parametrosCLI");

const {
  serverError, notFoundError, generalError
} = require("./errores/errores");
require("./db/db");

const app = express();

const puerto = options.puerto || process.env.PUERTO || 5000;

const server = app.listen(puerto, () => {
  debug(chalk.yellow(`Servidor escuchando en el puerto ${puerto}`));
});

server.on("error", err => serverError(err, puerto));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res, next) => {
  res.redirect("/incidencias");
});
app.use(notFoundError);
app.use(generalError);
