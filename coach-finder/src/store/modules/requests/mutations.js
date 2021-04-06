export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  setLastFetched(state) {
    state.lastFetched = new Date().getTime();
  },
};
