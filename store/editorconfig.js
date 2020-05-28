const editor = require('~/static/data/config/editor.json');

export const state = () => ({
  sidebarclose: editor.sidebarclose,
  sidebarwidth: editor.sidebarwidth,
})

export const mutations = {
  sidebarclose(state, { sidebarclose }) {
    state.sidebarclose = sidebarclose;
  },
  sidebarwidth(state, { sidebarwidth }) {
    state.sidebarwidth = sidebarwidth;
  }
}
