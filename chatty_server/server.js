const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
wss.broadcast = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState) {
      client.send(data);
    }
  })
}

wss.on('connection', (ws) => {            //wss instance of a websocket server. wss is our server
  console.log('Client connected');
  ws.on('message', function incoming(event) {      //ws is the connection to a single client
    const typeOfData = "";
    const message = JSON.parse(event);
    const dataToBeBroadcasted = {
      ...message,
      id: uuid(),
      type: "incomingMessage"
    };
    console.log(dataToBeBroadcasted)
    wss.broadcast(JSON.stringify(dataToBeBroadcasted))
  })
  ws.on('close', () => console.log('Client disconnected'));
});