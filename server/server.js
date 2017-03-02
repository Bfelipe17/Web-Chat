let path = require('path');
let http = require('http');
let express = require('express');
let socketIO = require('socket.io');
let {generateMessage} = require('./utils/message');

let publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Web Chat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Connected'))

  socket.on('createMessage', function(message, callback) {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from Server');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('disconnect', function() {
    console.log('User was disconnected');
  })
})

server.listen(port, function() {
  console.log(`Server is up running at ${port}`);
});
