import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"), //to prevent log out on refresh the page, check line 22
    },

    loadingWhole: false,

    currentSurvey: {
      loading: false,
      data: {},
    },

    surveys: {
      loading: false,
      data: [],
      links: []
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],

    notification: {
      show: false,
      type: null,
      message: null
    }
  },

  getters: {},

  mutations: {
    deteteSurvey: (state, id) => {
      state.surveys = state.surveys.filter((survey) => {
        return Number(survey.id) !== Number(id);
      });
    },

    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, userData) => {
      //userData came from the api after register action, line 35 here
      state.user.data = userData;
    },

    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },

    loadingWhole(state, payload) {
      state.loadingWhole = !state.loadingWhole;
    },

    setCurrentSurveyLoading(state, loading) {
      state.currentSurvey.loading = loading;
    },

    setCurrentSurvey(state, survey) {
      state.currentSurvey.data = survey.data;
    },

    setSurveysLoading(state, loading) {
      state.surveys.loading = loading;
    },

    setSurveys(state, surveys) {
      state.surveys.data = surveys.data
      state.surveys.links = surveys.meta.links;
    },

    notify: (state, { message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    }
  },

  actions: {
    async register({ commit }, user) {
      return await axiosClient.post("/register", user).then(({ data }) => {
        data.user.imageUrl =
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },

    async login({ commit }, user) {
      return await axiosClient.post("/login", user).then(({ data }) => {
        data.user.imageUrl =
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },

    async getUser({ commit }) {
      return await axiosClient.get("/user").then(({ data }) => {
        data.imageUrl =
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

        commit("setUser", data);
        return data;
      });
    },

    async logout({ commit }) {
      return await axiosClient.get("/user").then((res) => {
        if (res) commit("logout");
        return res;
      });
    },

    async getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return await axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },

    async saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        //if true we are updating, else create new
        response = await axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = await axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      }
      return response;
    },

    async deleteSurvey({ }, id) {
      return await axiosClient.delete('/survey/' + id);
    },

    async getSurveys({ commit }, { url = null } = {}) {
      url = url || '/survey'
      commit('setSurveysLoading', true);
      return await axiosClient.get(url).then((res) => {
        commit("setSurveysLoading", false);
        commit("setSurveys", res.data);
        return res;
      })
    },

    async getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        }).catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },

    async saveSurveyAnswer({commit}, {surveyId, answers}){
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers})
    },

  },

  modules: {},
});

export default store;

// register({ commit }, user) {
//   return new Promise((resolve, reject) => {
//     fetch("http://localhost/api/register", {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(user),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         data.user.imageUrl =
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

//         commit("setUser", data);
//         resolve(data);
//       });
//   });
// },

// async register({ commit }, user) {
//   await fetch("http://localhost/api/register", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(user),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       data.user.imageUrl =
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

//       commit("setUser", data.user);
//       commit("setToken", data.token);
//     });

//   return this.state.user;
// },

// async login({ commit }, user) {
//   await fetch("http://localhost/api/login", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(user),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       data.user.imageUrl =
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

//       commit("setUser", data.user);
//       commit("setToken", data.token);
//     });

//   return this.state.user;
// },

// async getUser({ commit }) {
//   await fetch("http://localhost/api/user", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer " + this.state.user.token,
//     },
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       response.imageUrl =
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

//       commit("setUser", response);
//     });
// },
