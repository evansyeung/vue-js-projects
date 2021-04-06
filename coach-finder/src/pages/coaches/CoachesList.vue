<template>
  <div>
    <!-- !! converts a string (truthy value) into a real true boolean -->
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button
            mode="outline"
            @click="loadCoaches({ forcedRefresh: true })"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="!isLoading && hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import { mapGetters, mapActions } from "vuex";
import BaseDialog from "../../components/ui/BaseDialog.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters("coaches", ["filteredCoaches", "hasCoaches", "isCoach"]),
  },
  async created() {
    this.isLoading = true;

    try {
      await this.loadCoaches({ forcedRefresh: false });
    } catch (error) {
      this.error = error.message || "Something went wrong!";
    }

    this.isLoading = false;
  },
  methods: {
    ...mapActions("coaches", ["loadCoaches"]),
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
