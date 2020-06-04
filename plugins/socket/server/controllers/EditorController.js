import Path from 'path';
import FS from 'fs';

import Controller from 'sockettools/src/Controller';
import ServerManager from '../../../manager/ServerManager';
import Download from 'downloadutils/src/Download';

export default class EditorController extends Controller {

  register() {
    this.addHandle('editor/addMedia', this.addMedia);
    this.addHandle('editor/addCategory', this.addCategory);
    this.addHandle('editor/config', this.config);
    this.addHandle('editor/deleteMedia', this.deleteMedia);
    this.addHandle('editor/saveRhythm', this.saveRhythm);
    this.addHandle('editor/loadRhythm', this.loadRhythm);
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  addCategory(request) {
    const json = Path.join(process.cwd(), 'static/data/downloads/index.json');
    delete require.cache[require.resolve(json)];
    const data = require(json);

    if (data.categories[request.params.key] !== undefined) {
      return {
        status: 'warning',
        message: 'Category ' + request.params.name + ' already exists',
      };
    }
    data.categories[request.params.key] = {
      name: request.params.name,
      path: request.params.path,
    };

    FS.writeFileSync(json, JSON.stringify(data, null, 2));
    FS.writeFileSync(Path.join(process.cwd(), 'static/data/downloads/' + request.params.key + '.json'), JSON.stringify([], null, 2));
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  addMedia(request) {
    const item = {
      url: request.params.url,
      output: request.params.output,
    };
    const p = ServerManager.createProcess('Request Download Info ...');

    const download = new Download(item.url, item.output);
    download.opts.cwd = Path.join(process.cwd(), 'static/downloads', request.params.type);

    download.promise
      .then(() => {
        if (download.item.new) {
          p.update(p.current, 'Post Process ...');
          const json = Path.join(process.cwd(), 'static/data/downloads', request.params.type + '.json');
          delete require.cache[require.resolve(json)];
          const data = require(json);

          data.push(item);
          FS.writeFileSync(json, JSON.stringify(data, null, 2));
          p.finish();
        } else {
          p.finish({
            status: 'warning',
            message: 'File ' + item.output + ' already exists in ' + request.params.type,
          });
        }
      })
      .catch(({ download }) => {
        p.finish(download.item);
      });

    download.download();

    if (download._downloadstream) {
      download._downloadstream.on('info', () => {
        p.update(p.current, 'Request Download Stream ...', download.getSize());
      });
      download._downloadstream.on('data', (buffer) => {
        p.increment(buffer.length, 'Downloading ...');
      });
    }

    return p.uuid;
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  config(request) {
    const json = Path.join(process.cwd(), 'static/data/config/editor.config.json');
    delete require.cache[require.resolve(json)];
    const data = require(json);

    for (const field in request.params) {
      if (data[field] !== undefined) {
        data[field] = request.params[field];
      }
    }
    FS.writeFileSync(json, JSON.stringify(data, null, 2));
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  deleteMedia(request) {
    const json = Path.join(process.cwd(), 'static/data/downloads/' + request.params.category + '.json');
    delete require.cache[require.resolve(json)];
    const data = require(json);

    for (const item in data) {
      if (data[item].output === request.params.output) {
        data.splice(item, 1);
      }
    }
    FS.writeFileSync(json, JSON.stringify(data, null, 2));

    const file = Path.join(process.cwd(), 'static', request.params.path);
    if (FS.existsSync(file)) {
      FS.unlinkSync(file);
    }
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  saveRhythm(request) {
    const cleanup = [];

    for (const region of request.params.regions) {
      const item = {
        id: region.id,
        time: region.time,
        animation: region.animation,
        effect: region.effect,
      };

      if (!item.animation.animation) {
        delete item.animation;
      }
      if (!item.effect.animation) {
        delete item.effect;
      }
      if (item.animation || item.effect) {
        cleanup.push(item);
      }
    }

    FS.writeFileSync(Path.join(process.cwd(), 'static/data/extras/rhythm', request.params.entity.output + '.json'), JSON.stringify(cleanup, null, 2));
  }

  /**
   * @param {import('sockettools/src/Request')} request
   */
  loadRhythm(request) {
    const path = Path.join(process.cwd(), 'static/data/extras/rhythm', request.params.entity.output + '.json');

    if (FS.existsSync(path)) {
      const data = JSON.parse(FS.readFileSync(path));

      for (const item of data) {
        if (!item.animation) {
          item.animation = {
            name: '',
            animation: '',
            speed: '',
            options: '',
          };
        }
        if (!item.effect) {
          item.effect = {
            name: '',
            animation: '',
            speed: '',
            options: '',
          };
        }
      }
      return data;
    }
    return [];
  }

}
