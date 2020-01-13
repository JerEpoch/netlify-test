import axios from 'axios'
import store from '../store/store'
import Vue from 'vue'

export const EventBus = new Vue()


export function isValidToken(token) {
  // if no token or invalid return false
  if(!token || token.split('.').length < 3) {
    return false
  }
  // splits the token to grab the issued expire time.
  // if the token is not expire return true else false
  const data = JSON.parse(atob(token.split('.')[1]))
  const exp = new Date(data.exp * 1000)
  const now = new Date()
  return now < exp
}

export function setUser() {
  //console.log("setting user....")
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  return axios.get(process.env.VUE_APP_URL + '/bracket-api/users/user')
    .then(res => {
    //console.log(res.data.logged_in_as)
    
    //console.log(res.data)

    store.commit('SET_USER', res.data.logged_in_as)
    store.dispatch('setAccess', res.data.user_access)
  })
  .catch(err => {
    console.log("error getting user " + err)
  })
}

export function checkUser() {
  // if the user is not set in the store
  // and there's a valid jwt. init the user data in the store
  // this is in case of a refresh and when user returns
  if(!store.getters.user) {
    if(isValidToken(localStorage.getItem('access_token'))){
      // setUser()
      store.dispatch('initUser')
    }
  }
}

export function checkUserInfoSet() {
  if(this.$store.getters.getEditUserInfo.email === undefined){
    //onsole.log(this.$store.getters.getEditUserInfo.email)
    //console.log("no profile loaded")
    return this.$store.dispatch('getUserInfo').then(() => {
      this.initUserProfile()
    })
  }
  else {
    //console.log("profile already there")
    this.initUserProfile()
  }
}

export function getAnnouncements() {
  console.log(store.getters.getAnnoucements)
  if(!store.getters.getAnnoucements){
    return axios.get(process.env.VUE_APP_URL + '/bracket-api/communitynews/getannouncements')
    .then(res => {
      console.log(res.data.data)
      store.commit('SET_ANNOUNCEMENTS', res.data.data)
    })
  }
}

export function getTourns() {
  console.log("test get tourns")
  
}


// checks if user is the creator of the tournament and returns true
// export function checkTournAdmin(token, id) {
//   // if(!isValidToken(token)) {
//   //   return false
//   // }

//   // finish backend here
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
//   return axios.get(`/bracket-api/tournament/tournadmin/${id}`, {
//   })
//   .then(res => {
//     //console.log("Data from checkTournAdmin function")
//     console.log(res.data)
//     var isAdmin = res.data.data
//     console.log(isAdmin)
//     if (!isAdmin) {
//       return false
//     }
//     else {
//       return true
//     }
//   })
//   //return true
// }