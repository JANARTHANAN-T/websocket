const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware to handle CORS (if needed)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  next();
});

// Serve the HTML file to the client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected: ', ws);

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the received message to all connected clients except the sender
    wss.clients.forEach(client => {
        console.log(client);
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});