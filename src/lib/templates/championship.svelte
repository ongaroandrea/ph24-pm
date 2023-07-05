<script>
	import Carousel from '$lib/Image/Carousel/carousel.svelte';
	export let images, first_color_palette, second_color_palette;
</script>

{#if images != undefined && images.length != 0}
	<div class="w-full" id="championship" style="background-color: {second_color_palette}">
		<div class="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
			<h1 class="text-center font-bold uppercase text-4xl py-8" style="color: {first_color_palette}">
				Championship
			</h1>
			<Carousel {images} />
		</div>
	</div>
{/if}
