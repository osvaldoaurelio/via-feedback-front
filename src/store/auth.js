import axios from "axios";

export default {
  namespaced: true,

  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },

    user(state) {
      return state.user;
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, user) {
      state.user = user;
    }
  },

  actions: {
    async signIn({ dispatch }, credentials) {
      const { data } = await axios.post("sessions", credentials);
      const { user, token } = data;

      return dispatch("attempt", { user, token });
    },

    async attempt({ commit, state }, { user, token }) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }

      try {
        commit("SET_USER", user);
      } catch (err) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    signOut({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    }
  }
};
