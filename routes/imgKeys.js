const { Router } = require("express");
const { check } = require("express-validator");

const { obtenerImagenPorKey } = require("../controllers/imagen");
const { validarJWT, validarCampos } = require("../middlewares");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    validarCampos,
  ],
  obtenerImagenPorKey
);

module.exports = router;
