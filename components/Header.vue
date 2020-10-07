<template>
    <v-toolbar prominent src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
        <v-toolbar-title>
            <nuxt-link to="/">Movie APP</nuxt-link>
        </v-toolbar-title>

         <v-spacer></v-spacer>

        <!-- <v-form action="/search" method="get">
            <input type="text" name="keyword" v-model="keyword" style="background-color:white">
            <input type="submit" style="background-color:orange" value="search">
        </v-form> -->

         <v-spacer></v-spacer>

        <nuxt-link to="/favorites"><h3 class="favorites">見たいリスト</h3></nuxt-link>
    </v-toolbar>
</template>
<style>
    
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