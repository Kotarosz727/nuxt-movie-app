<template>
    <div>
        <Header />
        <div class="container">
            <div v-for="list in lists" :key="list.id" class="lists">
                <div class="list">
                    <div class="image">
                        <nuxt-link :to="/movies/ + list.movie_id">
                            <img v-bind:src="imgPreUrl + list.poster_path" alt="img">
                        </nuxt-link>
                    </div>
                    <div class="title">
                        <p>{{ list.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .container {
        padding-top: 70px;
        display: flex;
        flex-direction: column;
        flex-flow: row wrap;
        align-content: space-between;
        justify-content: center;
    }
    .list img {
        padding-top: 30px;
        padding-right: 50px;
        height: 270px;
        width: 220px;
    }
    .title p{
        width: 200px;
        word-wrap: break-word;
    }
</style>

<script>
export default {
    created: function() {
        this.$store.dispatch('favorites/init')
    },
    data: function(){
        return {
            imgPreUrl: "http://image.tmdb.org/t/p/w185",
        }
    },
    computed: {
        lists() {
            return this.$store.state.favorites.favorites
        }
    }
    
}
</script>