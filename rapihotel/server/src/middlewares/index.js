const path = require("path");
const multer = require("multer");

const { v4 } = require("uuid");

// Configura el almacenamiento en local
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const uploader = multer({
  storage: storage,
  destination: path.join(__dirname, "../public/uploads"),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: debe ser un archivo de imagen válido");
  },
}).array("image"); // 'image' es el nombre del campo en el formulario

module.exports = {
  uploader,
};
//PENDIENTE!! Controlar la eliminacion automatica de los archivos temporales de la carpeta /public/uploads.
