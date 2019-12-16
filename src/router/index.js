import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import About from '@/components/About'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Community from '@/components/community/Community'
import CommunityNews from '@/components/community/CommunityNews'
import NewsPost from '@/components/community/NewsPost'
import WriteNewsPost from '@/components/community/WriteNewsPost'
import Announcements from '@/components/community/Announcements'
import UserProfile from '@/components/community/UserProfile'
import Profile from '@/components/auth/Profile'
import Admin from '@/components/admin/Admin'
import CurrentTournament from '@/components/tournament/CurrentTournament'
import CreateTournament from '@/components/tournament/CreateTournament'
import Tournament from '@/components/tournament/Tournament'
import TestThing from '@/components/auth/Test'

// import store from '@/store'
import store from '../store/store'
import { setUser} from '@/utils'

//https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/getapi',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/community-news',
      name: 'CommunityNews',
      component: CommunityNews
    },
    {
      path: '/announcements',
      name: 'Announcements',
      component: Announcements
    },
    {
      path: '/write-news-post',
      name: 'WriteNewsPost',
      component: WriteNewsPost
    },
    {
      path: '/newspost/:id',
      name: 'NewsPost',
      component: NewsPost
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      
      beforeRouteEnter(to, from, next) {
        setUser()
        if(!store.getters.isAuthenticated) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/profile/user/:id',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: Admin,
      beforeEnter(to, from, next) {
        //console.log('user admin: ' + store.getters.isAdmin)
        if (!store.getters.isAuthenticated){
          console.log("first one")
          next('/login')
        } else if(!store.getters.isAdmin) {
          console.log("admin one")
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/current_tournament',
      name: 'CurrentTournament',
      component: CurrentTournament
    },
    {
      path: '/new_tournament',
      name: 'CreateTournament',
      component: CreateTournament,
      beforeEnter(to, from, next) {
        if(!store.getters.isAuthenticated) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/tournament/:id',
      name: 'Tournament',
      component: Tournament
    },
    {
      path: '/testing',
      name: 'TestThing',
      component: TestThing
    }

  ]
})
