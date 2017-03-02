let socket = io();
let messageForm = document.getElementById('message-form');
let messageText = document.getElementById('message');
let messages = document.getElementById('messages');

socket.on('connect', function() {
  console.log('Connected to Server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  let li = document.createElement('li');
  li.textContent = (`${message.from}: ${message.text }`);

  messages.appendChild(li);
});

messageForm.addEventListener('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messageText.value
  }, function() {

  })
})

// $('#message-form').on('submit', function(e) {
//   e.preventDefault();
//
//   socket.emit('createMessage', {
//     from: 'User',
//     text:
//   })
// })
