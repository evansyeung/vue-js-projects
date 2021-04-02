export default {
  filteredCoaches(state, getter, rootState) {
    return rootState.coaches.coaches.filter((coach) => {
      if (
        rootState.filter.filterStates.frontend &&
        coach.areas.includes("frontend")
      ) {
        return true;
      }

      if (
        rootState.filter.filterStates.backend &&
        coach.areas.includes("backend")
      ) {
        return true;
      }

      if (
        rootState.filter.filterStates.career &&
        coach.areas.includes("career")
      ) {
        return true;
      }
      return false;
    });
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
};
