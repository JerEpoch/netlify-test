<template>
  <div>
    <b-container class="justify-content-center">
      <h1>Write news post</h1>

      <b-form @submit="onSubmit">
        <b-form-group label="Title:">
          <b-form-input :type="'text'" placeholder="News Post Title" v-model="postTitle">
            
          </b-form-input>
        </b-form-group>

        <b-form-group label="News Post:">
          <b-form-textarea class="About-Me-Field" placeholder="Type your post here." :rows="4" :max-rows="30" v-model="postBody"></b-form-textarea>
        </b-form-group>

        <b-button type="submit">Create Post</b-button>
        <b-form-checkbox v-model="isAnnouncement">Check if you want to make this an announcement.</b-form-checkbox>
        {{isAnnouncement}}
        
      </b-form>

    </b-container>
  </div>
</template>

<script>
  // import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    
    data() {
      return {
        postTitle: '',
        postBody: '',
        postData: {},
        isAnnouncement: false
      }
    },

    methods: {
      ...mapActions(['submitNewsPost']),
      onSubmit(e){
        e.preventDefault()
        // console.log("creating news post...")
        if (this.checkInput()) {
          this.postData.postTitle = this.postTitle
          this.postData.postBody = this.postBody
          this.postData.isAnnouncement = this.isAnnouncement
          // console.log(this.postData)
          this.submitNewsPost(this.postData)
          //this.$store.dispatch('submitNewsPost', this.postData)
        } else {
          console.log("invalid") // eslint-disable-line
        }

      },
      checkInput() {
        if (this.postTitle != "" && this.postBody != "") {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>