const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {            //wss instance of a websocket server. wss is our server
  console.log('Client connected');
  ws.on('message', function incoming(event) {      //ws is the connection to a single client
    const message = JSON.parse(event);
    console.log(`user ${message.username} said ${message.content}`);            //on('message') gets triggerered when client side WS hits socket.send
  })

  ws.on('close', () => console.log('Client disconnected'));
});