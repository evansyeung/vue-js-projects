export default {
  registerCoach(context, data) {
    const { firstName, lastName, description, rate: hourlyRate, areas } = data;
    const coachData = {
      id: context.rootGetters.userId,
      firstName,
      lastName,
      description,
      hourlyRate,
      areas,
    };
    context.commit("registerCoach", coachData);
  },
};
