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
      <coach-item
        v-for="coach in coaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
import { mapGetters } from "vuex";

export default {
  components: {
    CoachItem,
  },
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
