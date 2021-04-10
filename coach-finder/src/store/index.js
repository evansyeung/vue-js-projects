import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index.js";
import filterModule from "./modules/filter/index.js";
import requestModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    coaches: coachesModule,
    filter: filterModule,
    requests: requestModule,
    auth: authModule,
  },
});

export default store;
