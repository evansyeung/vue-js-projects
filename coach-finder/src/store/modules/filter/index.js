import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      filterStates: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  mutations,
  actions,
  getters,
};
