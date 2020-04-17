import Client from 'socket.io-client';

import Server from 'sockettools/src/Server';

const server = new Server();

export default server.createClient(Client(process.env.WS_URL), 'admin');
