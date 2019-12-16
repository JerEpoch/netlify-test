import Vue from 'vue'
import Vuex from 'vuex'


import auth from './modules/auth'
//import createTournament from './modules/createTournament'
import matchWinners from './modules/matchWinners'
import editUser from './modules/editUser'
import community from './modules/community'
// import { EventBus } from '@/utils'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    auth,
    matchWinners,
    editUser,
    community
  }
})
