# WebSockets Learning Project

This project is a small TypeScript sandbox for learning how websockets work in practice.

It contains two different servers:

1. An HTTP server on port `3000` built with Express.
2. A websocket server on port `8080` built with the `ws` package.

It also contains a terminal client that connects to the websocket server and lets you exchange messages interactively.

## What A WebSocket Is

A websocket is a persistent, two-way connection between a client and a server.

That is the key difference from normal HTTP:

- HTTP is request/response. The browser or client asks for something, the server answers, and the connection ends.
- WebSocket starts as a normal HTTP upgrade request, then turns into a long-lived connection that both sides can use whenever they want.

Once the websocket connection is open:

- the server can push messages to the client without waiting for another request
- the client can send messages at any time
- both sides stay connected until one of them closes the socket

That is why websockets are useful for chat apps, live dashboards, multiplayer games, notifications, and other real-time features.

## How This Project Works

The current code flow is simple and intentional.

### 1. Express handles the HTTP side

In [src/app.ts](src/app.ts), Express listens on port `3000` and responds to `GET /` with a JSON message.

This part is here to show that an application can serve both normal HTTP routes and websocket traffic at the same time.

### 2. `ws` creates a separate websocket server

The websocket server also starts in [src/app.ts](src/app.ts), but it listens on port `8080`.

When a client connects:

- the `connection` event fires
- the server sends a welcome message immediately
- the server registers listeners for `message` and `close`

### 3. The server echoes messages back

When the server receives a message, it logs the message and sends a response back using:

```ts
ws.send(`You said: ${message}`)
```

That is the simplest websocket pattern: receive a message, process it, and reply instantly over the same open connection.

### 4. The terminal client connects and chats

In [src/client.ts](src/client.ts), the client connects to `ws://localhost:8080`.

After the connection opens:

- the client prints the welcome message from the server
- it asks for input in the terminal
- every message you type is sent to the websocket server
- responses from the server are printed back to the terminal

If you type `exit`, the client closes the websocket and ends the process.

## Message Flow

This is the full round trip in this project:

1. The client opens a websocket connection to `ws://localhost:8080`.
2. The websocket server accepts the connection and emits `connection`.
3. The server sends a welcome message immediately.
4. The user types a message in the client terminal.
5. The client sends that message over the open websocket.
6. The server receives it through the `message` event.
7. The server echoes it back with `You said: ...`.
8. The client prints the response.

Because the connection stays open, steps 4 to 8 can repeat many times without reconnecting.

## What Makes The Project Work

The project works because each part has a single job.

- [src/app.ts](src/app.ts) starts and owns both servers.
- [src/client.ts](src/client.ts) is only responsible for opening a websocket connection and sending messages.
- `ws` handles the websocket protocol details.
- Express handles the HTTP route.
- TypeScript keeps the code readable and typed.

The important idea is that the websocket connection is stateful. The server remembers the connected client for as long as the socket stays open, so it can send messages back immediately without creating a new request every time.

## Current Capabilities

This project currently demonstrates:

- a basic HTTP endpoint at `http://localhost:3000/`
- a websocket server at `ws://localhost:8080`
- server-side welcome messages when a client connects
- client-to-server messaging
- server-to-client echo responses
- disconnect handling
- terminal-based interactive messaging

## Current Limitations

This is a learning project, so it is intentionally minimal.

It does not yet include:

- authentication
- rooms or channels
- multiple clients broadcasting to each other
- message history
- reconnection logic
- heartbeat/ping handling
- frontend UI in the browser

Those are natural next steps if you want to explore more realistic websocket behavior.

## Project Files

- [src/app.ts](src/app.ts): Express HTTP server plus websocket server.
- [src/client.ts](src/client.ts): interactive command-line websocket client.
- [package.json](package.json): scripts and dependencies.
- [tsconfig.json](tsconfig.json): TypeScript compiler configuration.

## Setup

Install dependencies:

```bash
npm install
```

Run the server in development mode:

```bash
npm run dev
```

In a second terminal, run the client:

```bash
npx ts-node src/client.ts
```

## Build And Run

Compile TypeScript to JavaScript:

```bash
npm run build
```

Run the compiled server:

```bash
npm start
```

## Quick Test

After starting both processes, try this:

1. Open the client.
2. Type `hello`.
3. Observe the server echo `You said: hello`.
4. Type `exit` to close the connection.

If that works, the websocket handshake, message exchange, and clean shutdown are all functioning.

## Troubleshooting

If the client prints `Unexpected server response: 200`, the connection reached something on port `8080`, but that process did not upgrade the request to a websocket.

Usually that means one of these is true:

- the websocket server from [src/app.ts](src/app.ts) is not running
- another process is already using port `8080`
- the client is pointing to the wrong URL

Fixing that usually means stopping the conflicting process and starting the websocket server again with `npm run dev` before launching the client.

## Notes On The Existing Commands

The original setup steps for this project were:

1. Initialize the project with `npm init`.
2. Install Express.
3. Install TypeScript tooling and type definitions.
4. Generate and configure `tsconfig.json`.
5. Add scripts for build, start, and dev workflows.

What commands did I use to start the project?

1. Initiated the project

```bash
npm init
```

2. installed express

```bash
npm install express
```

3. Installed Development Dependencies

```bash
npm install -D typescript @types/node @types/express ts-node nodemon
```

- descritption if what I installed
  - `typescript`: The compiler.
  - `@types/node` & `@types/express`: Type definitions so TypeScript understands these libraries.
  - `ts-node`: Allows running .ts files directly during development.
  - `nodemon`: Automatically restarts the server when code changes

4. Configure TypeScript

Generate a `tsconfig.json` file to define how my code is compiled.

```bash
npx tsc init
```

I update my `tsconfig.json` with these key settings to organize my code:

- `"rootDir": "./src"`: Where my TypeScript source files live.
- `"outDir": "./dist"`: Where compiled JavaScript will be placed.
- `"strict": true`: Enables all strict type-checking options.

5. Added Scripts to package.json

I added these commands to my package.json to streamline my workflow:
```json
"scripts": {
  "build": "npx tsc",
  "start": "node dist/app.js",
  "dev": "nodemon src/app.ts"
}
```
6 final(run server)

That setup is still the foundation of the repo. The websocket-specific behavior lives in the server and client files above.
