import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "HERE IS A TITLE",
    slug: "HERE IS THE SLUG",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "My name is BlaBla.<br>I am who developer with 9 years+ of expericence, free educational ",
    created_at: "2022-01-20 18:00:00",
    updated_at: "2022-01-20 18:00:00",
    expire_date: "2022-03-20 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you",
        description: null,
        data: {
          options: [
            { uuid: "aasdadsasda-asd-asd-asd-aa", text: "USA" },
            { uuid: "zxczxc-zxc-z-xcz-xczc-zcx", text: "India" },
            { uuid: "qweqw-qwe-qwe-qweqwe-qweq", text: "France" },
            { uuid: "fghfgh-fgh-fghfh-fghfgh-f", text: "Germany" },
          ],
        },
      },

      {
        id: 2,
        type: "checkbox",
        question: "Which language do you prefer",
        description: null,
        data: {
          options: [
            { uuid: "aasdadsasda1-asd-asd-asd-aa", text: "PHP" },
            { uuid: "zxczxc-zxc-z1-xcz-xczc-zcx", text: "Java" },
            { uuid: "qweqw-qwe-qwe1-qweqwe-qweq", text: "C#" },
            { uuid: "fghfgh-fgh-fgh1fh-fghfgh-f", text: "Python" },
          ],
        },
      },

      {
        id: 3,
        type: "checkbox",
        question: "How old are you",
        description: null,
        data: {
          options: [
            { uuid: "aasdadsas22da-asd-asd-a2sd-aa", text: "21" },
            { uuid: "zxczxc-zxc-223z-xcz-xcz2c-zcx", text: "35" },
            { uuid: "qweqw-qwe-qwe-33qw2eqw2e-qweq", text: "66" },
            { uuid: "fghfgh-fgh-fghfh23-f2ghfgh-f", text: "88" },
          ],
        },
      },

      {
        id: 4,
        type: "radio",
        question: "What are your hobbies",
        description: null,
        data: {
          options: [
            { uuid: "aasdadsasda-asd-asd-a2sd-aa", text: "Swimming" },
            { uuid: "zxczxc-zxc-z-xcz-xcz2c-zcx", text: "Running" },
            { uuid: "qweqw-qwe-qwe-qweqw2e-qweq", text: "Jogging" },
            { uuid: "fghfgh-fgh-fghfh-f2ghfgh-f", text: "Soccer" },
          ],
        },
      },

      {
        id: 5,
        type: "checkbox",
        question: "What is gender",
        description: null,
        data: {
          options: [
            { uuid: "aasdadsasda-asd-asd-a2sd-aa", text: "Male" },
            { uuid: "zxczxc-zxc-z-xcz-xcz2c-zcx", text: "Female" },
            { uuid: "qweqw-qwe-qwe-qweqw2e-qweq", text: "Baby" },
            { uuid: "fghfgh-fgh-fghfh-f2ghfgh-f", text: "Boy" },
          ],
        },
      },

      {
        id: 6,
        type: "text",
        question: "What is your favourite youtube channel?",
        description: null,
        data: {},
      },

      {
        id: 6,
        type: "textarea",
        question: "What do you know about your country",
        description: "Write your honest opinion. Everything is anonymous",
        data: {},
      },
    ],
  },

  {
    id: 200,
    title: "Laravel 8",
    slug: "HERE IS THE SLUG",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "My name is BlaBla.<br>I am who developer with 9 years+ of expericence, free educational ",
    created_at: "2022-01-20 18:00:00",
    updated_at: "2022-01-20 18:00:00",
    expire_date: "2022-03-20 18:00:00",
    questions: [],
  },

  {
    id: 300,
    title: "Tailwind CSS",
    slug: "HERE IS THE SLUG",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "My name is BlaBla.<br>I am who developer with 9 years+ of expericence, free educational ",
    created_at: "2022-01-20 18:00:00",
    updated_at: "2022-01-20 18:00:00",
    expire_date: "2022-03-20 18:00:00",
    questions: [],
  },
  {
    id: 400,
    title: "JavaScript",
    slug: "HERE IS THE SLUG",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "My name is BlaBla.<br>I am who developer with 9 years+ of expericence, free educational ",
    created_at: "2022-01-20 18:00:00",
    updated_at: "2022-01-20 18:00:00",
    expire_date: "2022-03-20 18:00:00",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"), //to prevent log out on refresh the page, check line 22
    },

    loadingWhole: false,

    surveys: [...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
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

    saveSurvey(state, survey){
      state.surveys = [...state.surveys, survey.data]
      // state.surveys = state.surveys.push(survey);
      
    },

    updateSurvey(state, survey){
      state.surveys = state.surveys.map((s) => {
        if(s.id == survey.data.id){
          return survey.data
        }
        return s;
      })
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

    async saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {console.log(survey);
        //if true we are updating, else create new
        response = await axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("updateSurvey", res.data);
            return res;
          });
      } else {
        response = await axiosClient
          .post('/survey', survey)
          .then((res) => {
            commit("saveSurvey", res.data);
            return res;
          });
      }
      return response;
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
