const { response } = require("express");
const { Imagen } = require("../models");

const obtenerImagenes = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, imagenes] = await Promise.all([
    Imagen.countDocuments(query),
    Imagen.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    imagenes,
  });
};

const obtenerImagen = async (req, res = response) => {
  const { id } = req.params;
  const imagenes = await Imagen.findById(id).populate("usuario", "nombre");
  // .populate("categoria", "nombre");

  res.json(imagenes);
};

const obtenerImagenPorKey = async (req, res = response) => {
  const { claveSecreta } = req.body;
  const imagen = await Imagen.findOne({
    claveSecreta,
    usuario: req.usuario._id,
  });
  if (!imagen) {
    return res.status(404).json({
      msg: `No existe una imagen con esa claveSecreta ${claveSecreta}`,
    });
  }

  res.json(imagen);
};

const crearImagen = async (req, res = response) => {
  const { usuario, ...body } = req.body;

  const imagenDB = await Imagen.findOne({ nombre: body.nombre });

  if (imagenDB) {
    return res.status(400).json({
      msg: `El producto ${imagenDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const imagen = new Imagen(data);

  // Guardar DB
  await imagen.save();

  res.status(201).json(imagen);
};

const actualizarImagen = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Imagen.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};
const borrarImagen = async (req, res = response) => {
  const { id } = req.params;
  const imagenBorrada = await Imagen.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(imagenBorrada);
};

module.exports = {
  obtenerImagenes,
  obtenerImagen,
  crearImagen,
  borrarImagen,
  actualizarImagen,
  obtenerImagenPorKey,
};
