#!/usr/bin/env node

const Path = require('path');
const FS = require('fs');
const Downloader = require('downloadtools/src/Downloader');

const manager = new Downloader();

function download(file, target) {
  FS.mkdirSync(Path.join(process.cwd(), target));
  if (Path.isAbsolute(file)) {
    data = require(file);
  } else {
    data = require(Path.join(process.cwd(), file));
  }
  const bulk = manager.createMulti(data).setCWD(target);

  return bulk.execute();
}

(async function () {
  await download('static/data/narrator.json', 'static/downloads/narrator');
  await download('static/data/sounds.json', 'static/downloads/sounds');
  await download('static/data/videos.json', 'static/downloads/videos');
})();
