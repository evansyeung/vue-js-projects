import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index.js";
import filterModule from "./modules/filter/index.js";

const store = createStore({
  modules: {
    coaches: coachesModule,
    filter: filterModule,
  },
  state() {
    return {
      // hardcode for now
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
