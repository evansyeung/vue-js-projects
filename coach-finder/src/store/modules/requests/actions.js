export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    console.log(
      "🚀 ~ file: actions.js ~ line 10 ~ contactCoach ~ newRequest",
      newRequest
    );

    context.commit("addRequest", newRequest);
  },
};
