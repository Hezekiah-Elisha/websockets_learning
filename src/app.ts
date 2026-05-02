import express, { type Request, type Response } from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express!" });
});

const s = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Web sockets starts here
const wss = new WebSocketServer({ port: 8080 });

function onSocketPreError(e: Error) {
  console.error("WebSocket error:", e);
}
function onSocketPostError(e: Error) {
  console.error("WebSocket post error:", e);
}

wss.on("connection", (ws) => {
  console.log("New client connected!");

  ws.send("Welcome to the WebSocket server!");
  console.log("Sent welcome message to client.");

  // message event listener
  ws.on("message", (message) => {
    console.log("Received message:", message.toString());
    ws.send(`You said: ${message}`);
  });

  // close event listener
  ws.on("close", () => {
    console.log("Client disconnected.");
  });

  ws.on("error", onSocketPreError);
  ws.on("error", onSocketPostError);
});

