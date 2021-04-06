export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((request) => request.coachId === coachId);
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
  shouldLoadRequests(state) {
    const lastFetched = state.lastFetched;
    if (!lastFetched) {
      return true;
    }

    const currentTimeStamp = new Date().getTime();
    // Check if lastFetched over 1 minute ago
    return (currentTimeStamp - lastFetched) / 1000 > 60;
  },
};
