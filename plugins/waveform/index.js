import WaveFormData from 'waveform-data';

export default class WaveForm {

  static createForFile(file) {
    return new Promise((resolve, reject) => {
      fetch(file)
        .then(async (response) => {
          console.log(response);
          const context = new AudioContext();
          let buffer = await response.arrayBuffer();
          console.log(buffer);
          buffer = await context.decodeAudioData(buffer);

          WaveFormData.createFromAudio({
            audio_context: context,
            array_buffer: buffer,
            scale: 128,
          }, (err, waveform) => {
            if (err) throw reject(err);
            resolve(waveform);
          });
        });
    });
  }

  static drawWaveForm(waveform) {
    const scaleY = (amplitude, height) => {
      const range = 256;
      const offset = 128;

      return height - ((amplitude + offset) * height) / range;
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();

    const channel = waveform.channel(0);

    // Loop forwards, drawing the upper half of the waveform
    for (let x = 0; x < waveform.length; x++) {
      const val = channel.max_sample(x);

      ctx.lineTo(x + 0.5, scaleY(val, canvas.height) + 0.5);
    }

    // Loop backwards, drawing the lower half of the waveform
    for (let x = waveform.length - 1; x >= 0; x--) {
      const val = channel.min_sample(x);

      ctx.lineTo(x + 0.5, scaleY(val, canvas.height) + 0.5);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    return canvas;
  }

}
