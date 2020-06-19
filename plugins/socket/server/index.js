import http from 'http'
import Socket from 'socket.io';

import Server from 'sockettools/src/Server';
import ServerController from './controllers/ServerController';
import ServerGameController from './controllers/ServerGameController';
import ServerManagerController from './controllers/ServerManagerController';
import EditorController from './controllers/EditorController';

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app);

    /* CUSTOM */
    const socketServer = new Server();

    socketServer.addController(new ServerManagerController(socketServer));
    socketServer.addController(new EditorController(socketServer));
    socketServer.addController(new ServerController(socketServer));
    socketServer.addController(new ServerGameController(socketServer));
    socketServer.createServer(Socket(server));
    /* CUSTOM */

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || '0.0.0.0', resolve));
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close));
  });
}
