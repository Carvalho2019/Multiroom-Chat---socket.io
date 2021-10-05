// import the module of framework express
const express = require('express')
// import the module of consign (auto_load)
const consign = require('consign')
// import the module of body-parser
const bodyParser = require('body-parser')
// import the module of express-validator
const { check } = require('express-validator')

// Initial the object express
const app = express();

// Set the variables 'view engine' and 'views' of express
app.set('view engine', 'ejs') //show engine in use
app.set('views', './app/views') // show location of views

// setting the middleware express.static
app.use(express.static('./app/public'))
// setting the middleware body-parser 
app.use(express.urlencoded({extended: true}))
// setting the middleware express-validator
//app.use(check)
//app.use(validationResult)

//execute auto_load of routes, models and controllers for object app
consign()
.include('app/routes')
.then('app/models')
.then('app/controllers')
.into(app)

// export the object app
module.exports = app;