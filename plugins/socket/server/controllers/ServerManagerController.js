import Controller from 'sockettools/src/Controller';
import ServerManager from '../../../manager/ServerManager';

export default class ServerManagerController extends Controller {

  register() {
    this.addHandle('process');
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  process(request) {
    const process = ServerManager.getProcess(request.params.process);

    return {
      process: process && process.data || null,
    };
  }

}
