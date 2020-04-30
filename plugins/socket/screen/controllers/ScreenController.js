import Controller from 'sockettools/src/Controller';
import MediaSystem from '../../../mediasystem';

export default class ScreenController extends Controller {

  register() {
    this.addHandle('sound');
    this.addHandle('scene');
    this.addHandle('stop');
    this.addHandle('text');
    this.addHandle('clip');
    this.addHandle('event');
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  event(request) {
    MediaSystem.system.event(request.params.data);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  clip(request) {
    MediaSystem.system.clip(request.params.data.clip);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  text(request) {
    MediaSystem.system.text(request.params.data);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  sound(request) {
    MediaSystem.system.sound(request.params.data);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  scene(request) {
    MediaSystem.system.scene(request.params.data);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  stop(request) {
    MediaSystem.system.stop();
  }

}
