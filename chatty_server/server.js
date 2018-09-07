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
    if (client.readyState === 1) {  //1 is open?
      client.send(data);
    }
  })
}

function announceClientCount() {
  const numberClientsConnected = wss.clients.size;
  const dataToBeBroadcasted = {
    userCount: numberClientsConnected,
    type: "userCount"
  };
  wss.broadcast(JSON.stringify(dataToBeBroadcasted))
}

const userColors = ['red', 'green', 'blue', 'rebeccapurple', 'black', 'maroon'];
function assignUserColor() {
  const colorIndex = Math.floor(Math.random() * ((userColors.length - 1) + 1));
  const userColor = userColors[colorIndex];
  const dataToBeBroadcasted = {
    userColor: userColor,
    type: "userColor"
  };
  wss.broadcast(JSON.stringify(dataToBeBroadcasted))
}

wss.on('connection', (ws) => {                     //wss instance of a websocket server. wss is our server
  console.log('Client connected');

  announceClientCount();
  assignUserColor();
  ws.on('message', function incoming(event) {      //ws is the connection to a single client. we can see this because if we console log wss, it will show the data for all the connected users, whereas if we console log ws, we will see data for a single user
    const message = JSON.parse(event);
    let dataToBeBroadcasted = {};
    if (message.type === "postNotification") {
      dataToBeBroadcasted = {
        ...message,
        id: uuid(),
        type: "incomingNotification"
      };
    } else if (message.type === "postMessage") {
      dataToBeBroadcasted = {
        ...message,
        id: uuid(),
        type: "incomingMessage"
      };
    }
    wss.broadcast(JSON.stringify(dataToBeBroadcasted))
  })
  ws.on('close', () => {
    console.log('Client disconnected');
    announceClientCount();
  })
});