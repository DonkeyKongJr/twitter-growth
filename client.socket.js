var socket = io.connect('http://localhost:3000');
  socket.on('friendship_result', function (data) {
    $('#results').append($('<li>').text(JSON.stringify(data)));
    console.log(data);
  });