import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index.js";
import filterModule from "./modules/filter/index.js";

const store = createStore({
  modules: {
    coaches: coachesModule,
    filter: filterModule,
  },
});

export default store;
