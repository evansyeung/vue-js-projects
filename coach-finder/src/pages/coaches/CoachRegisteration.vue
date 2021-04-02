<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm";

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch("coaches/registerCoach", formData);
      // replace is similar to $router.push navigation but you cant go back to the previous page
      this.$router.replace("/coaches");
    },
  },
};
</script>
