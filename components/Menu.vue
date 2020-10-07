<template>
    <div class="column_header">
        <nuxt-link id="playing_menu" to="/">
            <button type="button">上映中</button>
        </nuxt-link>
        <nuxt-link id="rated_menu" to="rated">
            <button type="button">高い評価</button>
        </nuxt-link>
        <nuxt-link id="popular_menu" to="popular">
            <button type="button">人気の映画</button>
        </nuxt-link>
    </div>
</template>

<style>
    .column_header {
		display: inline-flex;
	}
	.column_header button {
		padding-right: 15px;
	}
</style>