<template>
  <div class="hello">
    <h1>Testing</h1>
    <p>Hello</p>
    <p>good bye</p>

    <button @click="testBackEnd">  
      Click for testing backend
    </button>

    <p>{{msg}}</p>
    <p>{{url}}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        msg: '',
        url: process.env.VUE_APP_URL
      }
    },

    methods: {
      testBackEnd() {
        axios.get(this.url + '/test')
        .then(resp => {
          
          this.msg = resp.data
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>
