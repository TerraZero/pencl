import Controller from 'sockettools/src/Controller';

export default class ServerGameController extends Controller {

  register() {
    this.addHandle('game/media', this.media);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  media(request) {
    const screens = this.server.getSockets('screen');

    this.server.broadcast(screens, 'screen/media', request.params);
  }

}
