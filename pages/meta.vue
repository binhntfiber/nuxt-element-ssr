<script setup lang="ts">
const title = 'My Collections';
const desc = 'Create, curate, and manage collections of unique NFTs to share and sell.';

useHead({
	title,
	titleTemplate: '%s - Artrific V2',
});

useServerSeoMeta({
	ogTitle: title,
	description: desc,
	ogDescription: desc,
	twitterTitle: title,
});
</script>

<template>
	<div>Test meta</div>
</template>
