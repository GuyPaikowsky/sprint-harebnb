import {createStore} from 'vuex'
import {stayService} from '@/services/stay.service.js'
import {userStore} from '@/store/user.store.js'
import {showErrorMsg, showSuccessMsg} from '@/services/event-bus.service'

export const stayStore = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userStore
  },
  state: {
    stays: [],
    page: 1,
    limit: 30,
    selectedStay: stayService.getEmptyStay(),
    filter: {
      name: "",
      labels: [],
      // sortBy: "name"
    },
    labels: []
  },
  mutations: {
    setStays(state, stays) {
      state.stays = [...state.stays, ...stays]
    },
    setFilter(state, filter) {
      state.filter = filter
    },
    setLabels(state, labels) {
      state.labels = labels
    },
    setSelectedStay(state, stay) {
      state.selectedStay = stay
    },
    addStay(state, stay) {
      state.stays.push(stay)
    },
    updateStay(state, stay) {
      const index = state.stays.findIndex(t => t._id === stay._id)
      if (index !== -1) {
        state.stays[index] = stay
      }
    },
    removeStay(state, stayId) {
      state.stays = state.stays.filter(t => t._id !== stayId)
    },
    clearSelectedStay(state) {
      state.selectedStay = stayService.getEmptyStay()
    },
    incrementPage(state) {
      state.page++
    }
  },
  actions: {
    async loadStays({commit, state}) {
      try {
        const stays = await stayService.query(state.filter, state.page, state.limit)
        commit('setStays', stays)
        commit('incrementPage')
      } catch(err) {
        console.error(err)
        showErrorMsg('Failed to load stays!')
      }
    },
    setFilter({commit}, filter) {
      return Promise.resolve(commit('setFilter', filter))
    },
    async loadStay({commit}, stayId) {
      try {
        const stay = await stayService.getById(stayId)
        commit('setSelectedStay', stay)
        showSuccessMsg('Loaded stay successfully!')
      } catch (err) {
        console.error(err)

        showErrorMsg('Failed to load stay!')
      }
    },
    async saveStay({commit}, stay) {
      try {
        const savedStay = await stayService.save(stay)
        if (stay._id) {
          commit('updateStay', savedStay)
        } else {
          commit('addStay', savedStay)
        }
        showSuccessMsg('Saved stay successfully!')
      } catch(err) {
        console.error(err)
        showErrorMsg('Failed to save stay!')
      }
    },
    async deleteStay({commit}, stayId) {
      try {
        await stayService.remove(stayId)
        commit('removeStay', stayId)
        showSuccessMsg('Deleted stay successfully!')
      } catch (err) {
        console.error(err)
        showErrorMsg('Failed to delete stay!')
      }
    },
    clearSelectedStay({commit}) {
      commit('clearSelectedStay')
    },
    async getLabels({ commit }) {
      try {
        const labels = await stayService.getLabels();
        console.log(labels)
        commit('setLabels', labels)
      } catch (err) {
        console.error(err)
        showErrorMsg('Error getting labels!')
      }
    },
  },
  getters: {
    stays(state) {
      return state.stays
    },
    selectedStay(state) {
      return state.selectedStay
    },
    filter(state) {
      return state.filter
    },
    getStayById: (state) => (id) => {
      return state.stays.find(stay => stay._id === id)
    }
  }
})