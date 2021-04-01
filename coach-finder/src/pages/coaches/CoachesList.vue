<template>
  <section>
    Filter
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in coaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    // filteredCoaches() {
    //   return this.$store.getters["coaches/coaches"];
    // },
    // hasCoaches() {
    //   return this.$store.getters["coaches/hasCoaches"];
    // },
    ...mapGetters("coaches", ["coaches", "hasCoaches"]),
  },
};
</script>
