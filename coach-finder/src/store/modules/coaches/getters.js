export default {
  coaches(state) {
    return state.coaches;
  },
  filteredCoaches(_, _2, rootState) {
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
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldLoadCoaches(state) {
    const lastFetched = state.lastFetched;
    if (!lastFetched) {
      return true;
    }

    const currentTimeStamp = new Date().getTime();
    // Check if lastFetched over 1 minute ago
    return (currentTimeStamp - lastFetched) / 1000 > 60;
  },
};
