const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Imagen } = require("../models");

const cargarArchivo = async (req, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id } = req.params;

  modelo = await Imagen.findById(id);
  if (!modelo) {
    return res.status(400).json({
      msg: `No existe un producto con el id ${id}`,
    });
  }

  if (modelo.imgOriginal) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, "../uploads", modelo.imgOriginal);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  modelo.imgOriginal = await subirArchivo(req.files, undefined, "imgs");

  await modelo.save();

  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { id } = req.params;

  let modelo = await Imagen.findById(id);

  if (!modelo) {
    return res.status(400).json({
      msg: `No existe un producto con el id ${id}`,
    });
  }

  if (modelo.imgOriginal) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads/imgs",
      modelo.imgOriginal
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};

module.exports = {
  cargarArchivo,
  mostrarImagen,
  actualizarImagen,
};
