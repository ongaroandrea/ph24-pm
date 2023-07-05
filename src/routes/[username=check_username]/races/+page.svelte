<script>
	import '@fortawesome/fontawesome-free/css/all.css';
	import { _ } from 'svelte-i18n';
	import "lightgallery/css/lightgallery-bundle.css"
	import Footer from '$lib/templates/footer.svelte';
	import Rounds from '$lib/templates/rounds.svelte';
	import Sponsor from '$lib/templates/sponsor.svelte';
	import background_image from '$lib/images/gokart/image.jpg';
	import PersonalizedProduct from '$lib/templates/personalizedProduct.svelte';
	import lgThumbnail from 'lightgallery/plugins/thumbnail';
	import lgZoom from 'lightgallery/plugins/zoom';
	import lgShare from 'lightgallery/plugins/share';
	import lightGallery from 'lightgallery';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { dictionary } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import { t, locale, locales } from "svelte-i18n";
	var currentPage;
	var testo = ""
    locale.subscribe((value) => {
        var language = value.split("-")[0]
        testo  = get(dictionary)[language]["go_to_race"]
    })
	page.subscribe((value) => {
		currentPage = value.url.href;
	});

	/** @type {import('./$types').PageData} */
	export let data;
	

	onMount(() => {
		var i = 0;

		for (i = 0; i < data.races.length; i++) {
			let gal_val = document.getElementById('lightgallery_' + i);
			var _light_gallery;
			_light_gallery = lightGallery(gal_val, {
				plugins: [lgShare, lgThumbnail, lgZoom],
				speed: 500,
				licenseKey: '0000-0000-000-0000'
			});
		}
	});
</script>

<svelte:head>
	<title>{$_('race')} | {data.username.toUpperCase()}</title>
	<base href={currentPage} />
</svelte:head>

<!-- CONTAINER -->
<div class="h-96 relative" style="background: linear-gradient(70deg, black, transparent);">
	<img
		src={background_image}
		class="w-full h-full object-cover absolute mix-blend-overlay"
		alt="immagine"
	/>
	<div class="flex h-96 justify-center items-center text-center">
		<div>
			<span class="capitalize text-4xl text-white font-bold"> {$_('race')} </span>
			<br />
			<span class="capitalize text-2xl text-white">{$_('list_of_race')}</span>
		</div>
	</div>
</div>

<div
	class="mx-auto px-4 py-8 md:py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 text-[{data.second_color_palette}] text-2xl"
>
	<a href="."><i class="fa-solid fa-arrow-left" /> {data.username}</a>
</div>

{#if data.races != null}
	{#if data.races.length > 4}
		<Rounds
			username={data.username}
			display={false}
			races={data.races}
			first_color_palette={data.first_color_palette}
			second_color_palette={data.second_color_palette}
			primary_text_palette={data.primary_text_palette}
			second_text_palette={data.second_text_palette}
		/>
	{:else}
		{#each Array(data.races.length) as _, index (index)}
			<div class="mx-5 md:px-10 lg:mx-auto max-w-2xl py-8 lg:max-w-7xl">
				<div class="flex justify-between">
					<span class="text-left text-2xl font-black">{data.races[index]['name']}</span>
					<a href={data.races[index].url}
						><span class="text-left text-md text-2xl font-black">{testo}</span></a
					>
				</div>

				<div
					class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 py-8"
					id="lightgallery_{index}"
				>
					{#each Array.from({ length: data.races[index].images.length }, (_, index) => index) as number}
						<a
							href={data.races[index].images[number]}
							class="gallery-item"
							data-src={data.races[index][number]}
							data-sub-html="<h4>Photo by - PH24</h4> <p> Location - {data.races[index].name}</p>"
						>
							<img alt="immagine round" class="img-fluid" src={data.races[index].images[number]} />
						</a>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
{/if}

<!-- SPONSOR -->
<Sponsor
	image={data.sponsor}
	first_color_palette={data.first_color_palette}
	second_color_palette={data.second_color_palette}
	primary_text_palette={data.primary_text_palette}
	second_text_palette={data.second_text_palette}
/>

{#if data.helmet_pers.length != 0}
<PersonalizedProduct
	arrayProducts={data.helmet_pers}
	second_color_palette={data.second_color_palette}
/>
{/if}
<!-- FOOTER -->
<Footer
	first_color_palette={data.first_color_palette}
	second_color_palette={data.second_color_palette}
	primary_text_palette={data.primary_text_palette}
	second_text_palette={data.second_text_palette}
/>

<style lang="postcss">
	#lg-container-1 {
		display: none !important;
	}
</style>
