import Controller from 'sockettools/src/Controller';
import MediaSystem from '../../../mediasystem';

export default class ClientController extends Controller {

  register() {
    this.addHandle('sound');
    this.addHandle('scene');
    this.addHandle('stop');
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  sound(request) {
    MediaSystem.system.playSound(request.params.data);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  scene(request) {
    MediaSystem.system.load(request.params.data);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  stop(request) {
    MediaSystem.system.stop();
  }

}
