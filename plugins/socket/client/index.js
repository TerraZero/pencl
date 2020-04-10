import Client from 'socket.io-client';

import Server from 'sockettools/src/Server';
import ClientController from './controllers/ClientController';
import ComponentController from './controllers/ComponentController';

const server = new Server();
server.addController(new ClientController(server));
server.addController(new ComponentController(server));

export default server.createClient(Client(process.env.WS_URL));
