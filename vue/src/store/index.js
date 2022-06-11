import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"), //to prevent log out on refresh the page, check line 22
    },
  },

  getters: {},

  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },

    setUser: (state, userData) => {
      //userData came from the api after register action, line 35 here
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },

  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        fetch("http://localhost/api/register", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            data.user.imageUrl =
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
            console.log(data);
            commit("setUser", data);
            resolve();
          });
      });
    },
  },

  modules: {},
});

export default store;
