export const state = () => ({
  entity: null
});

export const mutations = {
  entity(state, { entity }) {
    state.entity = entity;
  },
  clear(state) {
    state.entity = null;
  }
}
