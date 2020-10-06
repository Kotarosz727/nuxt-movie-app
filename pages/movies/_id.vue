<template>
    <div>
        <Header />
        <div class="main">
            <div class="detail">
                <div class="detail_image">
                    <img v-bind:src="imgPreUrl + detail.poster_path" alt="img">
                    <div id="msg"></div>
                    <button v-if="favorite.length" @click="removeFavorite(detail.id)">見たいリストから解除</button>
                    <button v-else @click="addFavorite(detail.id, detail.original_title, detail.poster_path)">見たいリストに追加</button>
                </div>
                <div class="info">
                    <div class="title">
                        <h2>{{ detail.original_title }}</h2>
                    </div>
                    <div class="date">
                        <h3>{{ detail.release_date }}</h3>
                    </div>
                    <div class="overview">
                        {{ detail.overview }}
                    </div>
                </div>
            </div>
            <div class="wrap">
                <div>
                    <h3>関連</h3>
                </div>
                <div class="flex-container">
                    <div class="similar" v-for="similar in similars" :key="similar.id">
                        <div v-if="similar.id" class="similar_content">
                            <div class="simillar_image">
                                <nuxt-link :to="/movies/ + similar.id">
                                    <img v-bind:src="imgPreUrl + similar.poster_path" alt="img">
                                </nuxt-link>
                            </div>
                            <div class="similar_title">
                                {{ similar.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .main {
		padding-top: 100px;
		padding-left: 70px;
		max-width: 1400px;
	}
    .flex-container {
		display: flex;
		overflow-x: scroll;
    }
    .detail {
		display: flex;
        padding-top: 30px;
    }
    .detail_image {
        padding-top: 40px;
    }
    .detail_image img {
        height: 250px;
        width: 200px;
    }
    .info {
        padding-top: 40px;
        padding-left: 20px;
        float: left;
    }
    .overview {
        padding-top: 5px;
    }
    .wrap {
        clear: left;
        padding-top: 40px;
    }
    .similar_content{
        width: 100%;
        padding-right: 10px;
    }
    .similar_content img {
        height: 150px;
        width: 100px;
    }
</style>

<script>
    import firebase from '~/plugins/firebase'
    import { firestoreAction } from 'vuexfire'
    const axios = require('axios')
    let base_url = 'https://api.themoviedb.org';
	let sub_url = '/3/movie/'; 
    let api_key = process.env.MOVIE_API_KEY;

    export default {
        created: function() {
            this.$store.dispatch('favorites/init')
        },
        data: function(){
            return {
                imgPreUrl: "http://image.tmdb.org/t/p/w200",
				base_url,
				sub_url,
                api_key,
                favorite: [],
                id: '',
                func1: ''
            }
        },
        async asyncData ({ params }) {
            let favorite = []
            let id = Number(params.id)

            const [detail, similars, ] = await Promise.all([
                axios.get(base_url + sub_url + params.id + '?' + api_key + '&language=ja'),
                axios.get(base_url + sub_url + params.id + '/similar?' + api_key + '&language=ja'),
                    
            ]);

            await firebase.firestore().collection('favorites').where('movie_id', '==', id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        favorite.push(doc.data());
                    });
            })
            
            return {
                detail: detail.data,
                similars: similars.data.results,
                favorite: favorite
            }
        },
        methods: {
            async addFavorite(id, title, poster_path) {
                this.$store.dispatch('favorites/add', { id: id, title: title, poster_path: poster_path })

                var msg = document.getElementById('msg')
                msg.innerHTML = '見たいリストに追加しました。'

                await firebase.firestore().collection('favorites').where('movie_id', '==', id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.favorite.push(doc.data());
                    });
                })
            },
            removeFavorite(id) {
                this.$store.dispatch('favorites/remove', id)
                this.favorite = []
                var msg = document.getElementById('msg')
                msg.innerHTML = '見たいリストから除外しました。'
            }
        }
    }    

</script>