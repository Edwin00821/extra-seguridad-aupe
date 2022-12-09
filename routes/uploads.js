const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarArchivoSubir } = require("../middlewares");
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
} = require("../controllers/uploads");


const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe de ser de mongo").isMongoId(),
    validarCampos,
  ],
  actualizarImagen
);

router.get(
  "/:id",
  [check("id", "El id debe de ser de mongo").isMongoId(), validarCampos],
  mostrarImagen
);

module.exports = router;
