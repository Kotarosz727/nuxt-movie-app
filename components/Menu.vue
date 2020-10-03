<template>
    <div class="column_header">
        <nuxt-link to="playing">
            <h2>上映中</h2>
        </nuxt-link>
        <nuxt-link to="rated">
            <h2>高い評価</h2>
        </nuxt-link>
        <nuxt-link to="popular">
            <h2>人気の映画</h2>
        </nuxt-link>
    </div>
</template>

<style>
    .column_header {
		display: inline-flex;
	}
	.column_header h2 {
		padding-right: 15px;
	}
</style>