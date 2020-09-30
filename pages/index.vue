<template>
	<div class="main">
		<div class="search">
			<form action="">
				<input type="text">
				<button>search</button>
			</form>
		</div>
		<div class="column_header">
			<h2>上映中</h2>
		</div>
		<div class="content_flex">
			<div class="card" v-for="data in datas" :key="data.id">
				<div class="image">
						<a href="">
							<img v-bind:src="imgPreUrl + data.poster_path" alt="img">
						</a>
				</div>
				<div class="content">
					<h3 class="title">{{ data.title }}</h3>
				</div>
			</div> 
		</div>
	</div>
</template>

<style>
	.main {
		padding-top: 50px;
		padding-left: 70px;
		max-width: 1300px;
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
	let api_key = process.env.MOVIE_API_KEY;
	let url = 'https://api.themoviedb.org/3/movie/now_playing?'+api_key+'&language=ja&page=1'

	export default {
		data: function() {
            return {
                imgPreUrl: "http://image.tmdb.org/t/p/w185"
            }
        }, 
		asyncData({params, error}){
			return axios.get(url)
			.then((res) => {
				console.log(res.data.results)
				return { datas: res.data.results }
			})
			.catch((e => {
			  error({datas: e.response.status_message, message: "Error"})
			}))
		}
	}
</script>

