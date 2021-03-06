export const strict = false

export const state = () => {
  return {
    user: null,
    citizen: null,
    isMobile: false,
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_CITIZEN (state, citizen) {
    state.citizen = citizen || null
  },
  SET_MOBILE (state, isMobile) {
    state.isMobile = isMobile || false
  }
}

export const actions = {

  setUser ({ commit }, data) {
    if(data){
      commit('SET_USER', data)
    }
  },

  async loadCitizen({ commit }, user) {
    await this.$axios({
      url: `https://api.uee.life/citizens/${user.app_metadata.handle}`,
      method: 'GET'
    }).then((res) => {
        commit('SET_CITIZEN', res.data)
    }).catch((err) => {
        //eslint-disable-next-line
        console.error(err)
    })
  },

  setCitizen({ commit }, citizen) {
    commit('SET_CITIZEN', citizen)
  }
}

export const getters = {
  loggedCitizen (state) {
    return state.citizen
  },
  isMobile (state) {
    return state.isMobile
  }
}
