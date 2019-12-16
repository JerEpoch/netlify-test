import axios from 'axios'
import router from '../../router';

const state = {
  editUser: {},
  editUserError: '',
  editUserLoading: true
}

const mutations = {
  'SET_USER_EDIT'(state, user) {
    state.editUser = user
  },
  'RESET_ERROR_MESSAGES'(state) {
    state.editUserError = ''
  },
  'SET_EDIT_ERROR_MSG'(state, msg) {
    state.editUserError = msg
  },
  'SET_IS_LOADING'(state, payload) {
    state.editUserLoading = payload
  }
}

const actions = {
  getUserInfo({commit}) {
    commit('RESET_ERROR_MESSAGES')
    commit('SET_IS_LOADING', true)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return axios.get('/bracket-api/users/edit/user')
    .then(res => {
      //console.log(res.data)
      const user = res.data
      commit('SET_USER_EDIT', user)
      commit('SET_IS_LOADING', false)

    })
    .catch(err => {
      console.log(err.response)
      commit('SET_IS_LOADING', false)
    })
  },
  sendUserProfile({commit}, userData) {
    commit('RESET_ERROR_MESSAGES')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return axios.post('/bracket-api/users/edit/user', {
      email: userData.email,
      password: userData.password,
      newPassword: userData.newPassword,
      elPage: userData.elPage,
      twitch: userData.twitch,
      twitter: userData.twitter,
      newEmail: userData.newEmail,
      about: userData.aboutMe
    })
    .then(res => {
      //console.log(res.data)
      router.push('/profile')
    })
    .catch(err => {
      commit('SET_EDIT_ERROR_MSG',err.response.data.errorMsg)
      console.log(err.response.data.errorMsg)
    })
  }
}

const getters = {
  getEditUserInfo(state) {
    return state.editUser
  },
  getEditErrors(state) {
    return state.editUserError
  },
  editUserLoading: state => state.editUserLoading
}

export default {
  state,
  actions,
  getters,
  mutations
}