export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-http-demo-881d5-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    // For POST, Firebase automatically returns a generated an UUID
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send request."
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequest", newRequest);
  },
  async loadRequests(context) {
    // Avoid making another API call if lastFetched was within 1min ago
    if (!context.getters.shouldLoadRequests) {
      return;
    }

    const { userId: coachId, token } = context.rootGetters;
    const response = await fetch(
      `https://vue-http-demo-881d5-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch requests!"
      );
      // Whenever an error is thrown in this dispatch action the component that dispatched it can handle it
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const { message, userEmail } = responseData[key];
      requests.push({
        id: key,
        coachId,
        message,
        userEmail,
      });
    }

    context.commit("setRequests", requests);
    context.commit("setLastFetched");
  },
};
