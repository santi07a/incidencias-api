require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("incidencias:mongoDB");

mongoose.connect("mongodb+srv://somDev:bmnsbmns@cluster0.ekssc.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, err => {
  if (err) {
    debug(chalk.red("No hay conexión con la base de datos"));
    process.exit(1);
  }
  debug(chalk.blueBright("Iniciado el servidor con MongoDB"));
});
