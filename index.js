const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const port = process.env.PORT || 3000 

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve a basic HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    ws.send(`${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start server
server.listen(port , () => {
  console.log(`Server listening on port ${port}`);
});
