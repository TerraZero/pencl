import Vue from 'vue';
import GamepadFactory from 'vue-gamepad/lib/gamepad';
import { ButtonNames } from 'vue-gamepad/lib/button-mapping';
import { get } from 'vue-gamepad/lib/utils';
import { getAxisNameFromValue, getAxisNames } from 'vue-gamepad/lib/button-mapping';

const options = {
  analogThreshold: 0.1,
  buttonNames: ButtonNames,
  buttonRepeatTimeout: 200,
  buttonInitialTimeout: 200,
  injectClasses: true,
};

class Gamepad extends GamepadFactory(Vue, options) {
  /**
     * main loop
     */
  run() {
    this.getGamepads().forEach((pad) => {
      // check gamepad buttons
      pad.buttons.forEach((button, index) => {
        const name = options.buttonNames[index];

        // button is pressed
        if (button.pressed) {
          const events = get(this.events, [this.layer, 'pressed', name], []);

          if (events.length > 0) {
            const event = events[events.length - 1];
            const now = Date.now();
            const initial = typeof this.holding[name] === 'undefined';

            // button was just pressed, or is repeating
            if (initial
              || (event.repeat
                && (now - this.holding[name]) >= options.buttonRepeatTimeout)) {
              this.holding[name] = now;
              if (initial) {
                this.holding[name] += (options.buttonInitialTimeout
                  - options.buttonRepeatTimeout);
              }
              event.callback.call();
            }
          }
          // button was released
        } else if (!button.pressed && typeof this.holding[name] !== 'undefined') {
          delete this.holding[name];

          const events = get(this.events, [this.layer, 'released', name], []);
          if (events.length > 0) {
            const event = events[events.length - 1];
            event.callback.call();
          }
        }
      });

      // check gamepad axis
      pad.axes.forEach((value, index) => {
        if (value >= options.analogThreshold || value <= -(options.analogThreshold)) {
          const name = getAxisNameFromValue(index, value);
          const events = get(this.events, [this.layer, 'pressed', name], []);

          if (events.length > 0) {
            const event = events[events.length - 1];
            const now = Date.now();
            const initial = typeof this.holding[name] === 'undefined';

            // axis was just moved, or is repeating
            if (initial
              || (event.repeat
                && (now - this.holding[name]) >= options.buttonRepeatTimeout)) {
              this.holding[name] = now;
              if (initial) {
                this.holding[name] += (options.buttonInitialTimeout
                  - options.buttonRepeatTimeout);
              }
              event.callback.call(null, value);
            }
          }
        } else {
          const names = getAxisNames(index);

          // trigger the release event if this axis was previously pressed
          names.filter((name) => this.holding[name])
            .forEach((name) => {
              delete this.holding[name];

              const events = get(this.events, [this.layer, 'released', name], []);
              if (events.length > 0) {
                const event = events[events.length - 1];
                event.callback.call(null, value);
              }
            });
        }
      });
    });

    this.animationFrame = requestAnimationFrame(this.run.bind(this));
  }
}


const gamepad = new Gamepad();

export default gamepad;
