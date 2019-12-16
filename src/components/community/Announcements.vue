<template>
  <div>
    <b-container class="justify-content-center">
      <h1>Announcements</h1>
			<div class="post">
				<ul>
					<li v-for="(a) in announcements" :key="a.id">
						<div class="posted-by-t">by  {{ a.user }} - {{ a.publishDate | moment("MMMM Do YYYY") }}</div>
						<h1>{{a.newsTitle}}</h1>
						<div class="post-preview">{{ a.newsPost|truncateNewsPost }}<router-link :to="`/newspost/${a.id}`" v-if="a.newsPost.length > 200">Read more</router-link></div>
					</li>

				</ul>

			</div>

    </b-container>
  </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import {mapMutations} from 'vuex'
	import {getAnnouncements} from '@/utils'

	export default {

		computed: {
			...mapGetters({
				// username: 'user',
				announcements: 'getAnnouncements'
			})
		},
		mounted() {
			getAnnouncements()
		}
	}
</script>

<style>
	p {
		white-space: pre-wrap;
		
	}

	article {
		white-space: pre-wrap;
	}

	.members-news-link {
		font-size: .9em;
	}

</style>
