export default {
  setFrontend(context, payload) {
    context.commit({
      type: "setFilter",
      ...payload,
    });
  },
  setBackend(context, payload) {
    context.commit({
      type: "setFilter",
      ...payload,
    });
  },
  setCareer(context, payload) {
    context.commit({
      type: "setFilter",
      ...payload,
    });
  },
};
