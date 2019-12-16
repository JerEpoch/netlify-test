<template>
  <div>
    <b-container class="justify-content-center">
      <div class="post">
        <p class="published-date">{{newsPost.publishDate | moment("MMMM Do, YYYY")}}</p>
        <h1 class="news-title">{{ newsPost.newsTitle }}</h1>
        
        <div class="posted-by">Posted by {{newsPost.user}}</div>

        <div class="news-post-body">
          {{newsPost.newsPost}}
        </div>
      </div>

        
        <!-- <hr> -->
 



      <!-- border bottom not hr -->
    </b-container>
  </div>
</template>


<script>
import axios from 'axios'

  export default {
    data() {
      return {
        newsPost: {}
      }
    },
    mounted() {
      this.getNewsPost()
    },
    methods: {
      getNewsPost() {
        let id = parseInt(this.$route.params.id)
        // console.log(id)
        axios.get(`/bracket-api/communitynews/getnewspost/${id}`)
        .then(res => {
          // console.log(res.data.data)
          this.newsPost = res.data.data
        })
      }
    }
  }
</script>

<style>
  .news-post-header {

  }

  .news-title {
    font-weight: normal;
    font-size: 34px;
  }

  .news-post-body {
    padding-top: .75em;
  }

  .published-date {
    padding: 2px 6px;
    margin: 5px 0px 0px 0px;
    border: 1px solid #95a0af;
    float: right;
    position: relative;
    font-size: 14px;
    top: 20px;
  
  }

  .posted-by {
    font-size: 14px;
    border-bottom: 2px solid;
    padding-bottom: 2px;
  }
</style>