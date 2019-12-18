import axios from 'axios'
// import router from '../../router'
//import {sortAnnouncements} from '@/utils'

const state = {
  communityMembers: '',
  communityErrors: '',
  communityIsLoading: true,
  communityAllNews: '',
  announcements: '',
  totalPages: '',
  postPerPage: ''
}

const mutations = {
  'SET_COMMUNITY_MEMBERS'(state, members) {
    state.communityMembers = members
  },
  'SET_COMMUNITY_ERRORS'(state, error) {
    state.communityErrors = error
  },
  'SET_COMMUNITY_IS_LOADING'(state, payload) {
    state.communityIsLoading = payload
  },
  'SET_COMMUNITY_NEWS'(state, payload) {
    state.communityAllNews = payload
  },
  'SET_ANNOUNCEMENTS'(state, payload) {
    state.announcements = payload
  },
  'SET_TOTALPAGES'(state, payload) {
    state.totalPages = payload
  },
  'SET_POST_PER_PAGE'(state, payload) {
    state.postPerPage = payload
  }

}

const getters = {
  getCommunityMembers(state) {
    return state.communityMembers
  },
  getCommunityLoading(state) {
    return state.communityIsLoading
  },
  getCommunityNews(state) {
    return state.communityAllNews
  },
  getAnnouncements(state) {
    return state.announcements
  },
  getTotalPages(state) {
    return state.totalPages
  },
  getPostPerPage(state) {
    return state.postPerPage
  }
}

const actions = {
  getCommunityList({commit}) {
    commit('SET_COMMUNITY_IS_LOADING', true)
    return axios.get('/bracket-api/users/community')
    .then(res => {
      //console.log(res.data.members)
      commit('SET_COMMUNITY_MEMBERS', res.data.members)
      commit('SET_COMMUNITY_IS_LOADING', false)
    })
    .catch(err => {
      console.log(err)
    })
  },
  submitNewsPost( postData) {
    //console.log("sending " + postData.postBody + " " + postData.postTitle + " " + postData.isAnnouncement)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return axios.post('/bracket-api/communitynews/newpost', {
      news_title: postData.postTitle,
      news_post: postData.postBody,
      is_announcement: postData.isAnnouncement
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err =>{
      console.log(err.response.data.error)
    })
  },
  async getCommunityNewsPosts({commit}, page) {
    try {
      let response = await axios.get(process.env.VUE_APP_URL + '/bracket-api/communitynews/getnewsposts', {
      params: {
        page: page
      }
    })
      commit('SET_COMMUNITY_NEWS', response.data.data)
      commit('SET_TOTALPAGES', response.data.totalPages)
      commit('SET_POST_PER_PAGE', response.data.postsPerPage)
    } catch(err) {
      return {error: err}
    }


    // return axios.get('/bracket-api/communitynews/getnewsposts', {
    //   params: {
    //     page: page
    //   }
    // })
    // .then(res => {
    //    //console.log(res.data)
    //   // console.log("next url is: " + res.data.nextUrl)
    //   // console.log("total pages are: " + res.data.totalPages)
    //   commit('SET_COMMUNITY_NEWS', res.data.data)
    //   commit('SET_TOTALPAGES', res.data.totalPages)
    //   commit('SET_POST_PER_PAGE', res.data.postsPerPage)
    // })
  }
  // getCommunityAnnouncements({commit}) {
    
  // }
}

// return axios.get(url here, {
//   params: {
//     page: blah blah
//   }
// })


export default {
  actions,
  state,
  mutations,
  getters
}