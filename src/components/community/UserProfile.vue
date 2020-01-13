<template>
  <div>
    <b-container class="justify-content-center">
      <b-card no-body class="card-profile mt-3 border  border-secondary rounded card-background-color">
        <h4 slot="header" class="text-center">{{ user.username }}'s Profile</h4>
        <b-card-body  v-if="user.aboutMe" class="aboutMe-card-body">{{user.aboutMe}}</b-card-body>
        <b-card-body v-else>This member has not filled out their about section.</b-card-body>
        
        <b-card-body class="card-body-links" v-if="userLinks">
          <a :href="'https://twitch.tv/' + user.twitch" v-if="user.twitch" target="_blank" class="fa-icon-padding"><font-awesome-icon :icon="['fab', 'twitch']" size="2x"></font-awesome-icon></a>
          <a :href="'https://www.twitter.com'  + user.twitter" v-if="user.twitter" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" size="2x"></font-awesome-icon></a>
          <a :href="'https://' + user.elPage" v-if="user.elPage" target="_blank">Extra Life Page</a>
        </b-card-body>

        <b-card-body v-else>Member has not added any of their pages.</b-card-body>
      </b-card>

      <div>
        <router-link to="/community"><a>Members List</a></router-link>
      </div>
    </b-container>
  </div>
</template>


<script>
import axios from 'axios'

  export default {
    data() {
      return {
        user: {}
      }
    },
    mounted() {
      this.getUserProfile()
    },
    methods: {
      getUserProfile() {
        const userID = parseInt(this.$route.params.id)
        //console.log("User id is " + userID)
        return axios.get(process.env.VUE_APP_URL + `/bracket-api/users/community/user/${userID}`)
        .then(res => {
          this.user = res.data.msg
          // console.log(res.data.msg)
      })
  }
    },
    computed: {
      userLinks() {
        return this.user.twitter || this.user.twitch || this.user.elPage
      }
      // user() {
      //   const id = parseInt(this.$route.params.id)
      //   console.log(id)
      //   //return this.$store.getters.getCommunityMembers
      //   //this.$store.dispatch('getUserProfile', id)
      // }
    }
  }
</script>

<style>
  .card-profile {
    max-width: 70%;
  }

  .card-background-color {
    background-color: #edf4ff;
  }

  .card-header {
    border-bottom: 1px solid rgb(106, 112, 122);
  }

  .card-body-links {
    border-top: 1px solid;
  }

  .aboutMe-card-body {
    white-space: pre-wrap;
    
  }

  .fa-icon-padding {
    padding-right: 7px;
  }
</style>
