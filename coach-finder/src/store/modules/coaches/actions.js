export default {
  async registerCoach(context, data) {
    const { firstName, lastName, description, rate: hourlyRate, areas } = data;
    const { userId } = context.rootGetters;
    const coachData = {
      firstName,
      lastName,
      description,
      hourlyRate,
      areas,
    };

    const response = await fetch(
      `https://vue-http-demo-881d5-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) {
      // error
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      "https://vue-http-demo-881d5-default-rtdb.firebaseio.com/coaches.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      // error...
    }

    const coaches = [];

    for (const key in responseData) {
      const {
        firstName,
        lastName,
        description,
        hourlyRate,
        areas,
      } = responseData[key];
      coaches.push({
        id: key,
        firstName,
        lastName,
        description,
        hourlyRate,
        areas,
      });
    }

    context.commit("setCoaches", coaches);
  },
};
