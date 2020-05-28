const UUID = require('uuid').v4;
import Process from './server/Process';

class ServerManager {

  constructor() {
    this._processes = {};
  }

  /**
   * @returns {string}
   */
  createUUID() {
    return UUID();
  }

  /**
   * @param {string} message
   * @returns {Process}
   */
  createProcess(message = null) {
    const process = new Process(message);

    this._processes[process.uuid] = process;
    return process;
  }

  /**
   * @param {string} uuid
   * @returns {Process}
   */
  getProcess(uuid) {
    return this._processes[uuid];
  }

}

export default new ServerManager();
