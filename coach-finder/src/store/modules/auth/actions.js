// Make sure we only have 1 setTimeout function active at a time
let timer;

export default {
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    // If Current time already greater than expiresIn, don't log the user in
    if (expiresIn < 0) {
      return;
    }

    // Set a new auto logout timer with the remaining time left
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
        tokenExpiration: null,
      });
    }
  },
  async login(context, payload) {
    // We want to return this promise from context.dispatch
    // so our components can still keep track of API response, error, etc
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signUp(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const { email, password, mode } = payload;

    // TODO: Firebase App was taken down, API key does not work
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6_J5XJ530rdhHJnn7sGcSYTblyxqdHBU";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6_J5XJ530rdhHJnn7sGcSYTblyxqdHBU";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate."
      );
      throw error;
    }

    // +responseData.expireIn converts it to a number
    const expiresIn = +responseData.expiresIn * 1000;
    // getTime() gets current time in milliseconds
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    // Auto logout
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    // If a user was auto logged out we want to redirect them
    context.commit("setAutoLogout");
  },
};
