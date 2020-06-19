import Controller from 'sockettools/src/Controller';
import MediaSystem from '../../../mediasystem';

export default class ScreenController extends Controller {

  register() {
    this.addHandle('screen/media', this.media);
    this.addHandle('screen/timeline', this.timeline);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  media(request) {
    console.log(request);
    switch (request.params.type) {
      case 'timeline':
        MediaSystem.timeline(request.params.data);
        break;
      case 'intro':
        MediaSystem.intro();
        break;
      case 'logo':
        MediaSystem.intro(false);
        break;
      case 'images':
        MediaSystem.images(request.params.data);
        break;
      case 'sound':
        MediaSystem.sound(request.params.data.sound);
        break;
      case 'music':
        MediaSystem.music(request.params.data);
        break;
      case 'text':
        MediaSystem.text(request.params.data)
        break;
      case 'cancel':
        MediaSystem.stop(request.params.data.type)
        break;
    }
  }

}
