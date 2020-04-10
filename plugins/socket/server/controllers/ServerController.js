import Controller from 'sockettools/src/Controller';

export default class ServerController extends Controller {

  register() {
    this.addHandle('tunnel');
    this.addHandle('getMetas');
    this.addHandle('setData');
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
  async tunnel(request) {
    const response = await this.server.sockets[request.params.target].request(request.params.route, request.params.params);

    return response.data;
  }

  /**
   * @param {import('../../Request').default} request
   */
  setData(request) {
    this.server.broadcast(null, 'setData', request.params);
  }

}
