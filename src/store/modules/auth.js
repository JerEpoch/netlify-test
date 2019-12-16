import axios from 'axios'
import router from '../../router'
import {isValidToken, setUser} from '@/utils'



const state = {
  errorMsg: '',
  hasError: false,
  user: '',
  message: '',
  access_token: '',
  user_access: '',
  isTournAdmin: ''
}

const mutations =  {
  'SET_ERRORS'(state, msg) {
    state.errorMsg = msg
    state.hasError = true
  },
  setMessage(state, msg) {
    //console.log(msg)
    state.message = msg
  },
  'SET_USER'(state, user) {
    state.user = user
  },
  'RESET_ERROR_STATE'(state) {
    state.regErrors = null
    state.hasRegError = false
  },
  'SET_USER_TOKEN'(state, token) {
    //localStorage.token = token
    localStorage.setItem('access_token', token.access_token)
    //localStorage.setItem('refresh_token', token.refresh_token)
    state.access_token = token.access_token
    //state.refresh_token = token.refresh_token
  },
  'SET_TOKEN_USER_BACK'(state, token) {
    //sets the token when the user returns to the website
    state.access_token = token
  },
  'LOGOUT_USER'(state) {
    localStorage.removeItem('access_token')
    state.user = ''
    state.user_access = ''
    state.access_token = ''
  },
  'SET_ACCESS'(state, access) {
    state.user_access = access
  },
  'SET_TOURNAMENT_ADMIN'(state, isAdmin) {
    state.isTournAdmin = isAdmin
  }
}

const actions = {
  async signup ({commit}, authData) {
    commit('RESET_ERROR_STATE')
    return axios.post('/bracket-api/users/create', {
      email: authData.email,
      username: authData.username,
      password: authData.password
    })
      .then(res => {
        //console.log(res)
        commit('SET_USER', authData.username)
        commit('SET_USER_TOKEN', res.data[1])
        router.push('/')
      })
      .catch(error => {
        // console.log('Error registering: ', error.response.data.errorMsg)
        commit('SET_ERRORS', error.response.data.errorMsg)
      })
  },
  login({commit}, authData) {
    //console.log(authData)
    commit('RESET_ERROR_STATE')
    return axios.post('/bracket-api/users/login', {
      email: authData.email,
      password: authData.password
    })
      .then(res => {
        //console.log(res.data)
        commit('SET_USER_TOKEN', res.data)
        setUser()
        
      })
      .catch(error => {
        commit('SET_ERRORS', error.response.data.errorMsg)
        //console.log(error.response.data.errorMsg)
      })
  },
  logout({commit}) {
    commit('LOGOUT_USER')
    router.push('/login')
  },
  setAccess({commit}, access) {
    commit('SET_ACCESS', access)
    //console.log(localStorage.getItem('access_token'))
    commit('SET_TOKEN_USER_BACK', localStorage.getItem('access_token'))
  }, 
  initUser({commit, dispatch}) {
    commit('RESET_ERROR_STATE')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return axios.get('/bracket-api/users/user')
      .then(res => {
      //console.log(res.data.logged_in_as)
      
      //console.log(res.data)

      commit('SET_USER', res.data.logged_in_as)
      dispatch('setAccess', res.data.user_access)
    })
    // .catch(err => {
    //   // console.log("error getting user")
    // })
  },
  isTournamentAdmin({commit}, {id}) {

    //pull function out and add here
    // var isAd = checkTournAdmin(state.access_token, id)
    // console.log("ISTOURN ADMIN")
    // console.log(isAd)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return axios.get(`/bracket-api/tournament/tournadmin/${id}`, {
    })
    .then(res => {
      // console.log("Data from checkTournAdmin function")
      // console.log(res.data)
      var isAdmin = res.data.data
      // console.log("is tourn admin in auth.js")
      // console.log(isAdmin)
      commit('SET_TOURNAMENT_ADMIN', isAdmin)
      //console.log(isAdmin)
      // if (!isAdmin) {
      //   //return false
        
      // }
      // else {
      //   return true
      // }
    })
  },
  resetErrorState({commit}) {
    commit('RESET_ERROR_STATE')
  }
}

const getters = {
  errorMsg(state) {
    return state.errorMsg
  },
  hasError(state) {
    return state.hasError
  },
  user(state) {
    return state.user
  },
  getToken(state) {
    //console.log('getting token: ' + localStorage.getItem('access_token'))
    return state.access_token
  },
  isAuthenticated(state) {
    //console.log('is auth token: ' + state.token)
    return isValidToken(state.access_token)
    //return true
  },
  isAdmin(state) {
    return state.user_access === 'admin'
  },
  isStreamer(state) {
    return state.user_access === 'streamer'
  },
  userTournAdmin(state) {
    return state.isTournAdmin
  }
}

  export default {
    state,
    getters,
    actions,
    mutations
  }
