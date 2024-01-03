class LangController {
    changeLocale(req, res, next) {
      const locale = req.params.locale;
  
      // creamos la cookie con el nombre que hemos indicado en el fichero de configuración de i18n
      res.cookie('nodeapp-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días
      })
  
      // responder con una redirección a la misma página de la que venía
      res.redirect(req.get('referer'));
    }
  }
  
  module.exports = LangController;