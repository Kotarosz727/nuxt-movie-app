<template>
    <div>
        <div class="title">
            <h2>Title {{ detail.original_title }}</h2>
        </div>
        <div class="image">
		<img v-bind:src="imgPreUrl + detail.poster_path" alt="img">
        {{ detail.overview }}
        </div>
    </div>
</template>

<script>
    const axios = require('axios')
    let base_url = 'https://api.themoviedb.org';
	let sub_url = '/3/movie/'; 
    let api_key = process.env.MOVIE_API_KEY;
    
    export default {
        data: function(){
            return {
                imgPreUrl: "http://image.tmdb.org/t/p/w200",
				base_url,
				sub_url,
				api_key
            }
        },
        asyncData ({ params }) {
            return axios.get(base_url + sub_url + params.id + '?' + api_key + '&language=ja')
            .then((res) => {
                console.log(res.data)
                return { detail: res.data }
            })
        }
        
    }
</script>