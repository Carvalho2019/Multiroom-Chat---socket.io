const { body, validationResult } = require('express-validator');
const { emit } = require('../../config/server');

module.exports.initialChat = function(application, req, res){

  const dataForm = req.body;

  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
  };

  const result = validationResult(req)
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    res.render("index", {validate: result.array()})
    return
  }else {

    application.get('io').emit(
      'msgParaClient', 
      {nickname:  dataForm.nickname, message: 'connected on chat- online'})
    res.render("chat", {dataForm:dataForm});
  }

}