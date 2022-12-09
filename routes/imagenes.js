const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");

const {
  crearImagen,
  obtenerImagenes,
  obtenerImagen,
  borrarImagen,
  actualizarImagen,
} = require("../controllers/imagen");

const { existeImagenPorId } = require("../helpers/db-validators");

const router = Router();

router.get("/", obtenerImagenes);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeImagenPorId),
    validarCampos,
  ],
  obtenerImagen
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearImagen
);

router.put(
  "/:id",
  [validarJWT, check("id").custom(existeImagenPorId), validarCampos],
  actualizarImagen
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeImagenPorId),
    validarCampos,
  ],
  borrarImagen
);

module.exports = router;
