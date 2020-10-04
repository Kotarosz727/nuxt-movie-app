<template>
    <div>
        <Header />
        <div class="main">
        <div class="header"><h3>人気の映画</h3></div>
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
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    const axios = require('axios')
    let base_url = 'https://api.themoviedb.org';
	let sub_url = '/3/movie/'; 
	let country_url = '&language=en-US'
	let api_key = process.env.MOVIE_API_KEY;
	let popular_url = base_url + sub_url + 'popular?' + api_key + country_url;

    export default {
        data: function() {
            return {
                imgPreUrl: "http://image.tmdb.org/t/p/w185",
                page: 2,
                datas: []
            }
        }, 
		async asyncData({ params }) {
            const { data } = await axios.get(popular_url)
			return {
				datas: data.results,
			}
        },
        methods: {
            infiniteHandler($state) {
            axios.get((popular_url + this.page), {
                params: {
                    page: this.page,
                },
            }).then(({ data }) => {
                const datas = data.results;
                console.log(datas);
                if (datas.length) {
                    this.page += 1;
                    this.datas.push(...datas);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }).catch((error)=>{
                console.log('error')
            })
            },
        },
    }
</script>