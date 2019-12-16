<template>
  <div>
    <b-container class="justify-content-center">
      <h1>Community News</h1>
      
      <!-- <header>
        <hr>
        <h3>Article Headline</h3>
        <h6>by  Person - Date</h6>
      </header>
 

      <article>
        {{ testThing|truncate }}<router-link :to="'#'">Add Read More Link Eventually</router-link>
        
      </article> -->

    
        <ul>
          <li v-for="(p) in newsPosts" :key="p.id">
            <div class="news-post">
              <h1 class="news-title">{{ p.newsTitle }}</h1>
              <div class="posted-by-t">by  {{ p.user }} - {{ p.publishDate | moment("MMMM Do YYYY") }}</div>
              <div class="post-preview">{{ p.newsPost|truncateNewsPost }}<router-link :to="`/newspost/${p.id}`" v-if="p.newsPost.length > 200">Read more</router-link></div>
            </div>
  
          </li>
        </ul>

      <!-- <div class="overflow-auto">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav>
      </div> -->

      <div class="overflow-auto">
        <b-pagination v-model="currentPage" :total-rows="totalPages" :per-page="postPerPage" @change="getNewsPage"></b-pagination>
      </div>

      <!-- <div>{{currentPage}}</div>
      <div>{{totalPages}}</div> -->
      
    </b-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // import axios from 'axios'
  // import {truncateNewsPost} from '@/utils'
  // import '.../utils/filters'
  

  export default {
    data() {
      return {
        currentPage: 1
      }
    },
    created() {
      this.$store.dispatch('getCommunityNewsPosts')
    },
    computed: {
      ...mapGetters({
        newsPosts: 'getCommunityNews',
        totalPages: 'getTotalPages',
        postPerPage: 'getPostPerPage'
      })
    },
    methods: {
      ...mapActions(['getCommunityNewsPosts']),
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getNewsPage(page) {
        this.getCommunityNewsPosts(page)
        // console.log("current page clicked is " + page)
        // axios.get('/bracket-api/communitynews/getnewsposts',{
        //   params: {
        //     page: page
        //   }
        // })
        // .then(res => {
        //   console.log(res.data)
        // })
      }
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
  }

  .news-post {
    padding-bottom: .75em;
  }
  
  .news-title {
    font-weight: normal;
    font-size: 34px;
  }

  .posted-by {
    font-size: 14px;
  }

  .post-preview {
    padding-bottom: 2px;
    border-bottom: 2px solid;
    border-bottom-color: #dee1e5;
  }
</style>