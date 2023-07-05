<script>
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	export let images;
	let innerWidth = 0;
	$: numberOfSlides = innerWidth < 800 ? (innerWidth < 510 ? 1 : 2) : 3;
</script>
<svelte:window bind:innerWidth />
<div class="carousel py-10">
	{#if browser}
		<Carousel autoplay autoplayDuration={4000}  particlesToShow={numberOfSlides}>
			{#each images as image}
                <img class="px-6 h-32 object-contain" src="{image.url}" alt={image.name}>
            {/each}
		</Carousel>
	{/if}
</div>