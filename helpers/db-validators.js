const { Usuario, Imagen } = require("../models");

const emailExiste = async (correo = "") => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) throw new Error(`El correo: ${correo}, ya está registrado`);
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) throw new Error(`El id no existe ${id}`);
};

/**
 * Imagenes
 */
const existeImagenPorId = async (id) => {
  // Verificar si el correo existe
  const existeImagen = await Imagen.findById(id);
  if (!existeImagen) throw new Error(`El id no existe ${id}`);
};

module.exports = {
  emailExiste,
  existeUsuarioPorId,
  existeImagenPorId,
};
