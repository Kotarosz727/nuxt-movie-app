<template>
    <div>
        <div class="header"><h2>検索結果</h2></div>
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
</template>

<style>
    .f-container {
        display: flex;
        flex-direction: column;
        flex-flow: row wrap;
        align-content: space-between;
        justify-content: left;
    }

    .f-item {
        width: 200px;
    } 

    .image img {
        padding-top: 30px;
        padding-right: 30px;
        border-radius: 5px;
        height: 300px;
        width: 200px;
    }

</style>

<script>
    const axios = require('axios')
	let base_url = 'https://api.themoviedb.org';
	let sub_url = '/3/search/movie?'; 
	let api_key = process.env.MOVIE_API_KEY;
    let url = base_url+sub_url+'now_playing?'+api_key+'&language=ja'

    export default {
        data: function(){
            return {
				imgPreUrl: "http://image.tmdb.org/t/p/w185",
            }
        },
        asyncData ({ query }) {
            return axios.get(base_url + sub_url + api_key + '&language=en-US&query=' + query.keyword)
            .then((res) => {
                console.log(base_url + sub_url + api_key + '&language=en-US&query=' + query.keyword)
                return { datas: res.data.results }
            })
        }
    }
</script>