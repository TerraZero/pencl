import Controller from 'sockettools/src/Controller';

export default class ClientController extends Controller {

  register() {
    this.addHandle('settext');
  }

  /**
   * @param {import('../../Request').default} request
   */
  settext(request) {
    request.socket.component.text = request.params.value;
  }

}
