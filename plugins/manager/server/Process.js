import ServerManager from '../ServerManager';

export default class Process {

  static get states() {
    return {
      LOAD: 0,
      PROCESSING: 1,
      FINISHED: 2,
    };
  }

  constructor(message = null) {
    this._uuid = ServerManager.createUUID();
    this._current = 0;
    this._total = 1;
    this._message = message;
    this._error = null;
    this._state = Process.states.LOAD;
  }

  get uuid() {
    return this._uuid;
  }

  get current() {
    return this._current;
  }

  get total() {
    return this._total;
  }

  get message() {
    return this._message;
  }

  get state() {
    return this._state;
  }

  get error() {
    return this._error;
  }

  get data() {
    return {
      uuid: this.uuid,
      current: this.current,
      total: this.total,
      message: this.message,
      state: this.state,
      stateMessage: this.getStateMessage(),
      error: this.error,
      status: this.error === null,
    };
  }

  increment(increment, message = null, total = null, state = null) {
    return this.update(this.current + increment, message, total, state);
  }

  update(current, message = null, total = null, state = null) {
    this._current = current;
    if (message !== null) this._message = message;
    if (total !== null) this._total = total;
    if (state !== null) this._state = state;
    return this;
  }

  getStateMessage() {
    const states = Process.states;

    for (const state in states) {
      if (states[state] === this.state) {
        return state;
      }
    }
    return null;
  }

  finish(error = null) {
    this._current = this._total;
    this._state = Process.states.FINISHED;
    this._error = error;
    return this;
  }

}
