import Controller from 'sockettools/src/Controller';
import DeepData from 'utils/src/DeepData';

export default class ClientController extends Controller {

  register() {
    this.addHandle('setData');
    this.addHandle('getData');
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  setData(request) {
    const component = request.socket.components[request.params.component];

    DeepData.mergeDeep(component.$data, request.params.values);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  getData(request) {
    const component = request.socket.components[request.params.component];

    return component.$data;
  }

}
