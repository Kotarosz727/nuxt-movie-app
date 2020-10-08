<template>
    <div>
        <Header />
        <div class="main">
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
	const base_url = 'https://api.themoviedb.org';
	const sub_url = '/3/movie/'; 
	const country_url = '&language=en-US'
	const api_key = process.env.MOVIE_API_KEY;
	const top_rated_url = base_url + sub_url + 'top_rated?' + api_key + country_url;

    export default {
        data: function() {
            return {
                imgPreUrl: "http://image.tmdb.org/t/p/w185",
                page: 2,
                datas: []
            }
        }, 
		async asyncData({ params }) {
            const { data } = await axios.get(top_rated_url)
			return {
				datas: data.results,
			}
        },
        methods: {
            infiniteHandler($state) {
            axios.get((top_rated_url + this.page), {
                params: {
                    page: this.page,
                },
            }).then(({ data }) => {
                const datas = data.results;
                if (datas.length) {
                    this.page += 1;
                    this.datas.push(...datas);
                    $state.loaded();
                } else {
                    $state.complete();
                    console.log("finish")
                }
            }).catch((error)=>{
                console.log('error')
            })
            },
        },
        mounted() {
            let elm = document.getElementById('rated_menu')
            elm.style.cssText = "color: blue; background-color: yellow"
        }
    }
</script>