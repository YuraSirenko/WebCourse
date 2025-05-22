const WebSocket = require('ws');
const port = 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port }, () => {
  console.log(`WebSocket server started on ws://localhost:${port}`);
});

// Handle new connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
