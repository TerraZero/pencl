#!/usr/bin/env node

const Path = require('path');
const FS = require('fs');
const Downloader = require('downloadtools/src/Downloader');

const manager = new Downloader();

function download(file, target) {
  const output = Path.join(process.cwd(), target);
  if (!FS.existsSync(output)) {
    FS.mkdirSync(output);
  }
  if (Path.isAbsolute(file)) {
    data = require(file);
  } else {
    data = require(Path.join(process.cwd(), file));
  }
  const bulk = manager.createMulti(data).setCWD(output);

  return bulk.execute();
}

(async function () {
  await download('static/data/narrator.json', 'static/downloads/narrator').promise;
  await download('static/data/sounds.json', 'static/downloads/sounds').promise;
  await download('static/data/videos.json', 'static/downloads/videos').promise;
})();
