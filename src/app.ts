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
const wss = new WebSocketServer({ noServer: true });

function onSocketPreError(e: Error) {
  console.error("WebSocket error:", e);
}
function onSocketPostError(e: Error) {
  console.error("WebSocket post error:", e);
}

s.on("upgrade", (request, socket, head) => {
  socket.on("error", onSocketPreError);

  if (!!request.headers["BadAuth"]) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

