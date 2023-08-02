import {userService} from '@/services/user.service.js'

export const userStore = {
  state: {
    user: userService.getLoggedinUser() || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    async login({commit}, userCred) {
      try {
        const user = await userService.login(userCred)
        commit("setUser", user)
      } catch (err) {
        console.error("Failed to login:", err)
        throw err
      }
    },
    async signup({commit}, userCred) {
      try {
        const user = await userService.signup(userCred)
        commit("setUser", user)
      } catch (err) {
        console.error("Failed to signup:", err);
        throw err
      }
    },
    logout({commit}) {
      userService.logout()
      commit("setUser", null)
    },
  },
  getters: {
    user(state) {
      return state.user
    },
  },
}