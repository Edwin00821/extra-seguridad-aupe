const validaCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");

const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validarArchivo,
};
