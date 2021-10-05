const { body } = require('express-validator')
module.exports = function(application){
  application.post('/chat', body('nickname')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('Error in field name'),function(req, res){
    application.app.controllers.chat.initialChat(application, req, res)
  })

  application.get('/chat', function(req, res){
    application.app.controllers.chat.initialChat(application, req, res)
  })
}