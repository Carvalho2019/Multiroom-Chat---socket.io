// 1- import the settings of server
const app = require('./config/server')
// port default to listening
const server = app.listen(3000, function(){
  console.log("Server *online*")
})

//Websocket
const io = require('socket.io')(server)

app.set('io', io)
// create connection websocket
io.on('connection', function(socket){
    console.log("USer connect")

    socket.on('disconnect', function(){
      console.log('User disconnect')
    })
    
    socket.on('msgParaServer', function(data){
      // Dialog
      socket.emit('msgParaClient', {nickname: data.nickname, message: data.message})
      socket.broadcast.emit('msgParaClient', {nickname: data.nickname, message: data.message})
      // Person
      if(parseInt(data.nickname_updated) == 0){
        socket.emit('personConsumer', {nickname: data.nickname})
        socket.broadcast.emit('personConsumer', {nickname: data.nickname})
      }
    })


});