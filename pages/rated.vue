<template>
    <div>
        <Header />
        <div class="main">
            <div class="header"><h3>高評価</h3></div>
            <Menu />
            <div class="f-container">
                <div class="f-item" v-for="data in datas" :key="data.id">
                    <div class="image">
                        <nuxt-link :to="/movies/ + data.id">
                            <img v-if="data.poster_path" v-bind:src="imgPreUrl + data.poster_path" alt="no image">
                            <img v-else src="~/assets/noimage.png" alt="">
                        </nuxt-link>    
                    </div>
                    <div class="title">
                        {{ data.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
    const axios = require('axios')
	let base_url = 'https://api.themoviedb.org';
	let sub_url = '/3/movie/'; 
	let country_url = '&language=en-US&page=1'
	let api_key = process.env.MOVIE_API_KEY;
	let top_rated_url = base_url + sub_url + 'top_rated?' + api_key + country_url;

    export default {
        data: function() {
            return {
				imgPreUrl: "http://image.tmdb.org/t/p/w185",
            }
        }, 
		async asyncData({ params }) {
            const { data } = await axios.get(top_rated_url)
			return {
				datas: data.results,
			}
		}
    }
</script>