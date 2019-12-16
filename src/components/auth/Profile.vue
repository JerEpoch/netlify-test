<template>
  <div>
    <b-container class="justify-content-center">
      <h1 v-if="isLoading">Hang on while we fetch your profile.</h1>
      

      <div v-if="!isLoading">
      <h1>Your Profile</h1>

     
      <!-- <h2 v-if="user">{{ $store.getters.getEditUserInfo.email }} - {{ isLoading }}</h2> -->
      
    
      <!-- <h3>{{ user.email }}</h3> -->
      <!-- <b-alert id="errorAlert" variant="danger" dismissible :show="editErrors" >{{ editErrors }}</b-alert> -->
      <b-form @submit="onSubmit">
        <!-- <div class="input" :class="{invalid: $v.email.$error}">
          <b-form-group label="Email:" >
            <b-form-input type="email" @blur.native="$v.email.$touch()" :value="user.email" placeholder="Email" v-model="email" class="input-box-width" >
            </b-form-input>
            <div v-if="$v.email.$dirty">
              <p v-if="!$v.email.email">Must provide a valid email address.</p>
            </div>
          </b-form-group> -->
        <div class="input" >
          <b-form-group label="Email:" >
            <b-form-input :type="'text'" placeholder="Email" v-model="email" class="input-box-width" :class="{ invalid: errors.has('email')}" v-validate.disable="'required|email'" name='email' >
            </b-form-input>

            <!-- <b-form-input v-model="testEmail" class="input-box-width"></b-form-input> -->

          <span v-show="errors.has('email') " class="span-show-message">{{ errors.first('email')  }}</span>
            <!-- <div v-if="$v.email.$dirty">
              <p v-if="!$v.email.email">Must provide a valid email address.</p>
            </div> -->
          </b-form-group>
        </div>

        <!-- <b-form-group label="New Password:">
          <b-form-input type="password" placeholder="New Password" v-model.trim="newPassword" class="input-box-width" ref="newPassword" ></b-form-input>
        </b-form-group>

        <div class="input">
          <b-form-group label="Confirm New Password:">
            <b-form-input type="password" placeholder="Confirm New Password" class="input-box-width" name='password_confirmation'  v-model.trim="confirmPassword" v-validate="'confirmed:newPassword'" data-vv-as="password"></b-form-input>

            <span v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
          </b-form-group>
        </div> -->

        <b-form-group label="New Password:">
          <b-form-input :type="'password'" placeholder="New Password" v-model.trim="newPassword" class="input-box-width" ref="newPassword" v-validate="{min: 6}" name="newPassword" data-vv-as="password"
           :class="{ invalid: errors.has('newPassword')}"
          ></b-form-input>
          <span v-show="errors.has('newPassword')" class="span-show-message">{{ errors.first('newPassword') }}</span>
        </b-form-group>

        <div class="input">
          <b-form-group label="Confirm New Password:">
            <b-form-input :type="'password'" placeholder="Confirm New Password" class="input-box-width" name='password_confirmation'   v-validate="{confirmed:newPassword, min: 6}" data-vv-as="password"
             :class="{ invalid: errors.has('password_confirmation')}"
            ></b-form-input>

            <span v-show="errors.has('password_confirmation')" class="span-show-message">{{ errors.first('password_confirmation') }}</span>
          </b-form-group>
        </div>

        <!-- <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <b-form-group label="Confirm Password:">
            <b-form-input type="password" @blur.native="$v.confirmPassword.$touch()" placeholder="Confirm New Password" v-model="confirmPassword" class="input-box-width"></b-form-input>
            <div v-if="$v.confirmPassword.$dirty">
              <p v-if="!$v.confirmPassword.sameAsPassword">
                Your new password must match.
              </p>
            </div>
          </b-form-group>
        </div> -->

        <b-form-group label="Extra Life Donation Page:">
          <b-form-input type="text" v-model="elPage" placeholder="Extra Life Donation Page"  class="input-box-width" name="elPage" v-validate.disable="'url'" :class="{ invalid: errors.has('elPage')}" data-vv-as="Extra Life"></b-form-input>
          <span v-show="errors.has('elPage')" class="span-show-message">{{ errors.first('elPage') }}</span>
        </b-form-group>

        <b-form-group label="TwitchTV:">
          <b-form-input :type="'text'"  placeholder="Your Twitch Username" v-model="twitch" class="input-box-width" v-validate.disable="'alpha'" name='twitch' :class="{ invalid: errors.has('twitch')}"></b-form-input>
          <span v-show="errors.has('twitch')" class="span-show-message">{{ errors.first('twitch') }} (Your Twitch Username)</span>
        </b-form-group>

        <b-form-group label="Twitter:">
          <b-form-input type="text"  placeholder="Your Twitter Username" v-model="twitter" class="input-box-width" v-validate.disable="'url'" name='twitter' :class="{ invalid: errors.has('twitter')}" data-vv-as="Twitter"></b-form-input>
          <span v-show="errors.has('twitter')" class="span-show-message"></span>
        </b-form-group>

          <b-form-group label="Current Password:">
            <b-form-input type="password" required placeholder="Current Password" v-model="password" class="input-box-width"></b-form-input>
          </b-form-group>

          <b-form-group label="About Me:">
            <b-form-textarea class="About-Me-Field" placeholder="Tell us about yourself. What makes you tick as a person?" :rows="4" :max-rows="20" v-model="aboutMe"></b-form-textarea>
          </b-form-group>
          
  
        <b-button type="submit">Save Changes</b-button>
      </b-form>

      <span v-if="editErrors" class="span-show-message">{{ editErrors }}</span>
      </div>
    </b-container>
  </div>
</template>


<script>
  // import { setUser} from '@/utils'
  import { mapGetters } from 'vuex';
  // vuelidate

  // import {required, email, sameAs} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        elPage: '',
        twitch: '', 
        twitter: '',
        hasError: false,
        errorMessage: '',
        aboutMe: '',
        userData: {}
      }
    },
    // vuelidate
    // validations: {
    //   email: {
    //     required,
    //     email
    //   },
    //   confirmPassword: {
    //     asmeAsPassword: sameAs('newPassword')
    //   },
    //   password: {
    //     required
    //   }
    // },
    methods: {
      onSubmit(e){
        e.preventDefault()
        // this.$v.$touch()
        // isauth from store
        if(this.$store.getters.isAuthenticated) {
          this.$validator.validateAll().then(result => {
            if(!result) {
              
              console.log(result) // eslint-disable-line
            } else {
              this.checkIfChange()
              this.userData.password = this.password
              // console.log(this.userData)
              this.$store.dispatch('sendUserProfile', this.userData)
            }
            
            // if(!this.errors.any()) {
            //   console.log("NO ERRORS BROOOOO")
            //   
            //   
            //   console.log(this.userData)
            //   //this.$store.dispatch('sendUserProfile', this.userData)
            // }
            // else {
            //   console.log("Something went wrong with the form.")
            // }
          })
        }
        // else {
        //   console.log("hello   sdfsdf") 
        // }        
        // console.log("user data being updated:")
        // 
        
      },
      checkIfChange() {
        // this checks to see if the user changed their email address.
        // sets to true if so. this is for backend checking
        if(this.email != this.$store.getters.getEditUserInfo.email) {
          this.userData.newEmail = true
        }
   
        // this is needed otherwise it sends an empty string as a password.
        // that obviously is a terrible password. So this adds it only if user entered one.
        if(this.newPassword) {
          this.userData.newPassword = this.newPassword
        }
        this.userData.email = this.email
        this.userData.twitch = this.twitch
        
        this.userData.twitter = this.twitter
        this.userData.elPage = this.elPage
        this.userData.aboutMe = this.aboutMe
      },
      initUserProfile() {
        this.email = this.$store.getters.getEditUserInfo.email
        this.elPage = this.$store.getters.getEditUserInfo.elPage
        this.twitch = this.$store.getters.getEditUserInfo.twitch
        this.twitter =  this.$store.getters.getEditUserInfo.twitter
        this.aboutMe =  this.$store.getters.getEditUserInfo.aboutMe
      }
    },
    created() {
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


    },
    beforeCreate() {
      
      // setUser()

      
      
      //console.log("email in created hook  " + this.$store.getters.getEditUserInfo.email)
    
    },
    mounted() {
      //console.log("email in mounted hook  " + this.$store.getters.getEditUserInfo.email)

      //this.email = this.$store.getters.getEditUserInfo.email

    },
    beforeDestroy() {
      this.$store.dispatch('resetErrorState')
    },
    computed: {
      ...mapGetters({
        editUser: 'getEditUserInfo',
        editErrors: 'getEditErrors',
        isLoading: 'editUserLoading'
      })
      // testEmail: {
      //   get() {
      //     return this.$store.getters.getEditUserInfo.email
      //   },
      //   set() {}
      // }
    }
  }

</script>

<style>
  .input-box-width {
    width: 55%;
  }

  .About-Me-Field {
    width: 55%;
    /* white-space: pre-line; */
    white-space: pre-wrap;
  }

  .error {
    color: red;
  }

  .has-error {
    border: 1px solid red;
  }

  .input-box-width.invalid {
    border: 2px solid red;
  }

  .input.invalid input {
    border: 1px solid red;
  }

  .span-show-message {
    color: #c4072d;
    font-weight: bold;
  }
</style>