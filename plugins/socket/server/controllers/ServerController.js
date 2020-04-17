import Controller from 'sockettools/src/Controller';
import OS from 'os';

export default class ServerController extends Controller {

  register() {
    this.addHandle('debug');
    this.addHandle('getMetas');
    this.addHandle('setData');
    this.addHandle('getHostdata');
    this.addHandle('updateScreen');
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  getMetas(request) {
    const metas = {};

    for (const uuid in this.server.sockets) {
      metas[uuid] = this.server.sockets[uuid].meta;
    }
    return metas;
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  async debug(request) {
    if (request.params.targettype) {
      const targets = this.server.getSockets(request.params.targettype);
      const responses = await Promise.all(this.server.broadcast(targets, request.params.route, request.params.params));

      const datas = [];
      for (const response of responses) {
        datas.push(response.data);
      }
      return datas;
    } else {
      const response = await this.server.sockets[request.params.target].request(request.params.route, request.params.params);

      return response.data;
    }
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  getHostdata(request) {
    return {
      hostname: OS.hostname(),
      port: 3000,
    };
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  setData(request) {
    this.server.broadcast(null, 'setData', request.params);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  updateScreen(request) {
    const screens = this.server.getSockets('screen');

    this.server.broadcast(screens, request.params.route, request.params.params);
  }

}
