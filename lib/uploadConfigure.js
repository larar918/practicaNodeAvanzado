const multer = require('multer');
const path = require('node:path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const ruta = path.join(__dirname, '..', 'public', 'images');
    callback(null, ruta);
  },
  filename: function(req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
})

// Configuración de upload
const upload = multer({ storage });

module.exports = upload;