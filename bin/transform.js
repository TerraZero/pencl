const Path = require('path');
const FS = require('fs');

const narrator = require('./data/all-narrator.json');
const medias = require('./data/medias.json');

function find(items, file) {
  let base = Path.basename(file);
  base = base.substring(0, base.length - Path.extname(base).length);
  for (const item of narrator) {
    let itembase = Path.basename(item.url);
    itembase = itembase.substring(0, itembase.length - Path.extname(itembase).length);
    if (itembase === base) {
      item.convert = true;
      item.output = itembase + '.mp3';
      items.push(item);
    }
  }
}

function rebuildNarrator() {
  const items = [];

  for (const sound of medias.sounds) {
    if (sound.sound) {
      if (Array.isArray(sound.sound)) {
        for (const s of sound.sound) {
          find(items, s.howl);
        }
      } else if (sound.sound.howl) {
        find(items, sound.sound.howl);
      }
    }
  }

  FS.writeFileSync('static/data/narrator.json', JSON.stringify(clearDuplicates(items), null, 2));
}

function rebuildSounds() {
  const items = [];

  for (const scene of medias.scenes) {
    if (scene.sound && scene.sound.videoId) {
      items.push({
        url: 'https://www.youtube.com/watch?v=' + scene.sound.videoId,
        convert: 'mp3',
      });
    }
    if (scene.sounds) {
      for (const sound of scene.sounds) {
        items.push({
          url: 'https://www.youtube.com/watch?v=' + sound.videoId,
          convert: 'mp3',
        });
      }
    }
  }

  FS.writeFileSync('static/data/sounds.json', JSON.stringify(clearDuplicates(items), null, 2));
}

function rebuildVideos() {
  const items = [];

  for (const scene of medias.scenes) {
    if (scene.video) {
      items.push({
        url: 'https://www.youtube.com/watch?v=' + scene.video.videoId
      });
    }
  }

  FS.writeFileSync('static/data/videos.json', JSON.stringify(clearDuplicates(items), null, 2));
}

function clearDuplicates(items) {
  return items.filter((value, index, array) => {
    return array.slice(index + 1).find((findvalue) => {
      return findvalue.url === value.url;
    }) === undefined;
  });
}

rebuildNarrator();

rebuildSounds();

rebuildVideos();
