const express = require('express');
const http = require('http');
const WebSocket = require('ws');

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
server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
