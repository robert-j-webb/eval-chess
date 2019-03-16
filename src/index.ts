import express from 'express';
import http from 'http';
import { AddressInfo } from 'net';
import path from 'path';
import socketio from 'socket.io';
import run from './telnet';

const port: number = parseInt(process.env.port || '', 10) || 4000;
const wsPort = parseInt(process.env.wsPort || '', 10) || port + 1;
const app = express();
const server = new http.Server(app);
const io = socketio(server);
// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define a route handler for the default home page
app.get('/', async (req, res) => {
  // render the index template
  res.send(await run());
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', (socket: any) => {
  console.log('a user connected');
  socket.on('message', (message: any) => {
    console.log(message);
    socket.emit('message', message);
  });
});

// start our server
const wsServer = server.listen(wsPort, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
