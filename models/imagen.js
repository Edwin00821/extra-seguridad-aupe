const { Schema, model } = require("mongoose");

const ImagenSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  imgOriginal: {
    type: String,
  },
  mensaje: {
    type: String,
  },
  claveSecreta: {
    type: String,
  },
  imgEstenografica: {
    type: String,
  },
});

ImagenSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Imagen", ImagenSchema);
