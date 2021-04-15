const express = require("express");
const debug = require("debug")("incidencias:incidencias");
const { getIncidencias } = require("../controladores/incidencias");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { error, incidencias } = await getIncidencias(req.params.tipo, req.query);
  if (error) {
    return next(error);
  }
  return res.json(incidencias);
});

module.exports = router;
