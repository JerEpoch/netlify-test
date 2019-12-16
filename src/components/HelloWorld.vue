<template>
  <div class="col-md-6 offset-md-3 col-lg-3" >
      <h1>EL Bracket Site</h1>
      <button @click="getApi">Get api</button>
      <button @click="getApiTwo">Get api two</button>
      <button @click="jwtprot">Test jwt prot</button>
      <button @click="userinfo">Get the user</button>
      <button @click="forceLogout">Force User Logout</button>
      <button @click="deleteposts">Delete news post</button>
      <h3>{{ msg }}</h3>
      <p>This is for testing only. Doesn't do anything exciting.</p>
      <p>User: {{ userState }}</p>
      <!-- <p>Register Errors: {{ errorMessages }} </p> -->
      <!-- <p>Has Reg Error: {{ hasRegErr }}</p> -->
      <p>Token: {{ token }}</p>
      <p>authenticated: {{ authenticated }}</p>

      <div>
        <button @click="testHeroku">Test heroku</button>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
 
  //const BASE_URL = 'http://127.0.0.1:5000'
  
  export default {
    name: 'app',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      getApi() {
        axios.get('/bracket-api/api')
          .then(response => {
            console.log(response.data.msg) // eslint-disable-line
            this.msg = response.data.msg
      })
      .catch(e => {
        console.log(e.response) // eslint-disable-line
      })
    },
    getApiTwo() {
      axios.get('/bracket-api/api/two')
        .then(response => {
          //console.log(response.body.msg)
          this.msg = response.data.msg
          console.log(response.data) // eslint-disable-line
      })
      .catch(e => {
        console.log(e.response) // eslint-disable-line
      })
    },
    getApiThree() {
      axios.get('/api/two')
        .then(response => {
          //console.log(response.body.msg)
          this.msg = response.data.msg
      })
      .catch(e => {
        console.log(e.response) // eslint-disable-line
      })
    },
    userinfo() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      axios.get('/bracket-api/users/edit/user')
        .then(res => {
          console.log(res) // eslint-disable-line
        })
    },
    getCreate() {
      axios.get('/bracket-api/users')
        .then(response => {
          this.msg = response.data.msg
        })
    },
    logoutUser() {
      this.$store.dispatch('logout')
    },
    jwtprot() {
      console.log("Testing jwt protected route...") // eslint-disable-line
      //console.log(localStorage.getItem('access_token'))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      return axios.get('/bracket-api/testjwt')
      .then(res => {
        console.log(res.data) // eslint-disable-line
      })
      .catch(err => {
        console.log(err) // eslint-disable-line
      })
    },
    forceLogout() {
      this.$store.dispatch('logout')
    },
    deleteposts() {
      return axios.get('/bracket-api/communitynews/deletepost')
      .then(res => {
        console.log(res.data) // eslint-disable-line
      })
    },
    testHeroku() {
      console.log("testing heroku api") // eslint-disable-line
      axios.get('https://flask-test-bracket3.herokuapp.com/bracket-api/api')
      .then(resp => {
        console.log(resp.data) // eslint-disable-line
      })
    }
  },
  computed: {
    ...mapGetters({
      userState: 'user',
      // errorMessages: 'registerErrorMsg',
      // hasRegErr: 'hasReigsterError',
      token: 'getToken',
      authenticated: 'isAuthenticated'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .centered-items {
    justify-content: center;
    flex-direction: column
  }

</style>
