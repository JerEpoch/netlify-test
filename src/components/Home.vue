<template>
	<div>
		<b-container class="justify-content-center">
			<h1>Recent Announcements</h1>
			<div class="post">
				<ul>
					<li v-for="(a) in announcements" :key="a.id">
						<div class="posted-by-t">by  {{ a.user }} - {{ a.publishDate | moment("MMMM Do YYYY") }}</div>
						<h1>{{a.newsTitle}}</h1>
						<div class="post-preview">{{ a.newsPost|truncateNewsPost }}<router-link :to="`/newspost/${a.id}`" v-if="a.newsPost.length > 200">Read more</router-link></div>
					</li>

				</ul>

			</div>
			<p class="members-news-link">Looking for our members' announcements? <router-link to="/community-news">Click here.</router-link></p>
			<p class="members-news-link"><router-link to="/announcements">See all announcements.</router-link></p>

			<h2>This site is a work in progress.</h2>
		</b-container>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import {mapMutations} from 'vuex'
	// import axios from 'axios'
	// import store from '../store/store'
	import { getAnnouncements} from '@/utils'

	export default {
		data() {
			return {
				hasName: false
			}
		},
		computed: {
			...mapGetters({
				username: 'user',
				announcements: 'getAnnouncements'
			})
		},
		// methods: {
		// 	getAnnouncements() {
		// 		return axios.get('/bracket-api/communitynews/getannouncements')
		// 		.then(res => {
		// 			console.log(res.data)
		// 		})
		// 	}
		// },
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
