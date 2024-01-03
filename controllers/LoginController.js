const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class LoginController {
  
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email,password)

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // se lanza un error si no existe o no coincide
      if (!usuario || !(await usuario.comparePassword(password)) ) {
        //res.json({ error: 'Invalid credentials' });
        return;
      }

      // si está todo ok devolvemos el JWT
      const tokenJWT = await jwt.sign({ _id: usuario._id }, '9iup435ntrhjitgeijt', {
        expiresIn: '24h'
      });
      res.json({ jwt: tokenJWT });
      console.log(tokenJWT)

    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;