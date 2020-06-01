const editor = require('~/static/data/config/editor.config.json');

export const state = () => ({
  sidebarclose: editor.sidebarclose,
  sidebarwidth: editor.sidebarwidth,
  masterfontsize: editor.masterfontsize,
})

export const mutations = {
  sidebarclose(state, { sidebarclose }) {
    state.sidebarclose = sidebarclose;
  },
  sidebarwidth(state, { sidebarwidth }) {
    state.sidebarwidth = sidebarwidth;
  },
  masterfontsize(state, { masterfontsize }) {
    state.masterfontsize = masterfontsize;
  }
}
