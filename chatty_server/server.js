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
  const typeOfData = "userCount"
  const numberClientsConnected = wss.clients.size;
  const dataToBeBroadcasted = {
    userCount: numberClientsConnected,
    type: typeOfData
  };
  wss.broadcast(JSON.stringify(dataToBeBroadcasted))
}

wss.on('connection', (ws) => {                     //wss instance of a websocket server. wss is our server
  console.log('Client connected');
  announceClientCount();
  ws.on('message', function incoming(event) {      //ws is the connection to a single client. we can see this because if we console log wss, it will show the data for all the connected users, whereas if we console log ws, we will see data for a single user
    const message = JSON.parse(event);
    console.log(message)
    let dataToBeBroadcasted = {};
    let typeOfData = "";
    if (message.type === "postNotification") {
      typeOfData = "incomingNotification"
      dataToBeBroadcasted = {
        ...message,
        id: uuid(),
        type: typeOfData
      };
    } else if (message.type === "postMessage") {
      typeOfData = "incomingMessage"
      dataToBeBroadcasted = {
        ...message,
        id: uuid(),
        type: typeOfData
      };
    }
    wss.broadcast(JSON.stringify(dataToBeBroadcasted))
  })
  ws.on('close', () => {
    console.log('Client disconnected');
    announceClientCount();
  })
});