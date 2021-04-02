import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index.js";
import filterModule from "./modules/filter/index.js";
import requestModule from "./modules/requests/index.js";

const store = createStore({
  modules: {
    coaches: coachesModule,
    filter: filterModule,
    requests: requestModule,
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
