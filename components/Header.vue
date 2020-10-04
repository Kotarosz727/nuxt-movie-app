<template>
    <header>
        <nuxt-link to="/"><h1>Movie APP</h1></nuxt-link>
        <div class="search">
            <form action="/search" method="get">
                <input type="text" name="keyword" v-model="keyword">
                <button type="submit">search</button>
            </form>
        </div>
        <nuxt-link to="/favorites"><h3 class="favorites">見たいリスト</h3></nuxt-link>
    </header>
    
</template>
<style>
    header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 30px 4% 10px;
        background-color: aqua;
        position: fixed;
        top: 0;
    }
</style>
<script>
    export default {
        data: function() {
        return {
            keyword: ""
        }
    }
    }
    
</script>