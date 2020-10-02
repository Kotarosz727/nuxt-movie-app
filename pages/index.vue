<template>
	<div>
		<Header />
		<div class="main">
			<div class="search">
				<form action="/search" method="get">
					<input type="text" name="keyword" v-model="keyword">
					<button type="submit">search</button>
				</form>
			</div>
			<div class="column_header">
				<h2>上映中</h2>
			</div>
			<div class="content_flex">
				<div class="card" v-for="data in datas1" :key="data.id">
					<div class="image">
							<nuxt-link :to="/movies/ + data.id">
								<img v-bind:src="imgPreUrl + data.poster_path" alt="img">
							</nuxt-link>
					</div>
					<div class="content">
						<h3 class="title">{{ data.title }}</h3>
					</div>
				</div> 
			</div>
			<div class="column_header">
				<h2>高い評価</h2>
			</div>
			<div class="content_flex">
				<div class="card" v-for="data in datas2" :key="data.id">
					<div class="image">
							<nuxt-link :to="/movies/ + data.id">
								<img v-bind:src="imgPreUrl + data.poster_path" alt="img">
							</nuxt-link>
					</div>
					<div class="content">
						<h3 class="title">{{ data.title }}</h3>
					</div>
				</div> 
			</div>
			<div class="column_header">
				<h2>人気の映画</h2>
			</div>
			<div class="content_flex">
				<div class="card" v-for="data in datas3" :key="data.id">
					<div class="image">
							<nuxt-link :to="/movies/ + data.id">
								<img v-bind:src="imgPreUrl + data.poster_path" alt="img">
							</nuxt-link>
					</div>
					<div class="content">
						<h3 class="title">{{ data.title }}</h3>
					</div>
				</div> 
			</div>
		</div>
	</div>
</template>

<style>
	.main {
		padding-top: 50px;
		padding-left: 70px;
		max-width: 1400px;
	}
	.search {
		padding-top: 40px;
	}
	.column_header {
		padding-top: 40px;
	}
	.content_flex {
		width: 100%;
		display: flex;
		overflow-x: scroll;
	}
	.content_flex .card {
		padding-right:20px;
	}
	img{
		border-radius: 10px;
	}
</style>

<script>
	const axios = require('axios')
	let base_url = 'https://api.themoviedb.org';
	let sub_url = '/3/movie/'; 
	let country_url = '&language=en-US&page=1'
	let api_key = process.env.MOVIE_API_KEY;
	let now_playing_url = base_url + sub_url + 'now_playing?' + api_key + country_url; 
	let top_rated_url = base_url + sub_url + 'top_rated?' + api_key + country_url;
	let popular_url = base_url + sub_url + 'popular?' + api_key + country_url; 

	console.log(top_rated_url);

	export default {
		data: function() {
            return {
				imgPreUrl: "http://image.tmdb.org/t/p/w185",
				base_url,
				sub_url,
				api_key,
				keyword: ""
            }
        }, 
		async asyncData({ params }) {
			const [ nowPlayings, topRated, popular] = await Promise.all([
				axios.get(now_playing_url),
				axios.get(top_rated_url),
				axios.get(popular_url)
			]);

			return {
				datas1: nowPlayings.data.results,
				datas2: topRated.data.results,
				datas3: popular.data.results
			}
		} 
	
	}
</script>

