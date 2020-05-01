#!/usr/bin/env node

const HTTPS = require('https');
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

async function downloadImages(file, target) {
  const output = Path.join(process.cwd(), target);
  if (!FS.existsSync(output)) {
    FS.mkdirSync(output);
  }
  if (Path.isAbsolute(file)) {
    data = require(file);
  } else {
    data = require(Path.join(process.cwd(), file));
  }
  for (const item of data) {
    const newPath = Path.join(output, item.output);
    if (FS.existsSync(newPath)) {
      console.log('Image exists: ' + item.output + ' [' + item.url + ']');
      continue;
    }
    const stream = FS.createWriteStream(newPath);
    await new Promise((resolve, reject) => {
      console.log('Download image: ' + item.url);
      HTTPS.get(item.url, function (response) {
        response.pipe(stream).on('finish', () => {
          console.log('File: ' + item.output);
          resolve();
        });
      }).on('error', (e) => {
        console.log(e);
      });
    });
  }
}

(async function () {
  await download('static/data/narrator.json', 'static/downloads/narrator').promise;
  await download('static/data/sounds.json', 'static/downloads/sounds').promise;
  await download('static/data/videos.json', 'static/downloads/videos').promise;
  await downloadImages('static/data/dd-images.json', 'static/downloads/dd_images');
  await downloadImages('static/data/clips.json', 'static/downloads/clips');
  await downloadImages('static/data/new.json', 'static/downloads/new');
})();
