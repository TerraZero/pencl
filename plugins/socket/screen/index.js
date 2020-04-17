import Client from 'socket.io-client';

import Server from 'sockettools/src/Server';
import ScreenController from './controllers/ScreenController';

const server = new Server();
server.addController(new ScreenController(server));

export default server.createClient(Client(process.env.WS_URL), 'screen');
