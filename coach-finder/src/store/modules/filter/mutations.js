export default {
  setFilter(state, payload) {
    const { filterType, isActive } = payload;
    state.filterStates[filterType] = isActive;
  },
};
