<template>
<div>
  <b-container class="justify-content-center w-50">
    <h1>Login</h1>
      <b-form @submit="onSubmit">
      <b-form-group label="email:">
        <b-form-input type="text" required placeholder="email" v-model="email" class="input-box-width">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input type="password" required placeholder="Password" v-model="password" class="input-box-width">
        </b-form-input>
      </b-form-group>
      <b-button type="submit">Submit</b-button>
    </b-form>
    <p class="mt-2">Not signed up yet? <router-link to="/signup"><a>Click here.</a></router-link></p>
    
    <b-alert variant="danger" :show="loginError" dismissible class="alert-box-width">{{ loginErrorMessage }}</b-alert>
  </b-container>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  // import {setUser} from '@/utils'

  export default {
    data() {
      return {
        email: '',
        password: '',
        message: 'test message'
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', formData)
        .then(() => {
          
          this.$router.push('/profile')
        })
        // .catch(err => {
        //   console.log(err)
        // })
      }
    },
    computed: {
      ...mapGetters({
        loginError: 'hasError',
        loginErrorMessage: 'errorMsg'
      })
    },
    beforeDestroy() {
      this.$store.dispatch('resetErrorState')
    }
  }
</script>


<style>
  .input-box-width {
    width: 55%;
  }

  .alert-box-width {
    width: 55%;
  }
</style>