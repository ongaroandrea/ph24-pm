<script>
	import { _ } from 'svelte-i18n';
	import Footer from '$lib/templates/footer.svelte';
	import 'lightgallery/css/lightgallery-bundle.css';
	import lgThumbnail from 'lightgallery/plugins/thumbnail';
	import lgZoom from 'lightgallery/plugins/zoom';
	import lgShare from 'lightgallery/plugins/share';
	import lightGallery from 'lightgallery';
	import lgVideo from 'lightgallery/plugins/video';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import logo from '$lib/images/logo.png';
	import Comments from '$lib/templates/comments.svelte';
	let isLoading = false;
	/** @type {import('./$types').ActionData} */
	var currentPage;
	page.subscribe((value) => {
		currentPage = value.url.href;
		currentPage = removeParam('token', currentPage);
	});
	
	onMount(() => {
		let gal_val = document.getElementById('lightgallery');
		var _light_gallery;
		_light_gallery = lightGallery(gal_val, {
			plugins: [lgShare, lgThumbnail, lgZoom, lgVideo],
			speed: 500,
			licenseKey: '0000-0000-000-0000'
		});
	});

	export let data;

	const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		const blob = new Blob(byteArrays, { type: contentType });
		return blob;
	};

	function removeParam(key, sourceURL) {
		var rtn = sourceURL.split('?')[0],
			param,
			params_arr = [],
			queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
		if (queryString !== '') {
			params_arr = queryString.split('&');
			for (var i = params_arr.length - 1; i >= 0; i -= 1) {
				param = params_arr[i].split('=')[0];
				if (param === key) {
					params_arr.splice(i, 1);
				}
			}
			if (params_arr.length) rtn = rtn + '?' + params_arr.join('&');
		}
		return rtn;
	}
</script>

<svelte:head>
	<title>Race Gallery - {data.username.toUpperCase()}</title>
</svelte:head>
<div class="w-full h-full">
	<!-- CONTAINER -->
	<div class="h-96 relative" style="background: linear-gradient(70deg, black, transparent);">
		<img
			src={data.background}
			class="w-full h-full object-cover absolute mix-blend-overlay"
			alt="immagine"
		/>
		<div class="flex h-96 justify-center items-center text-center">
			<div>
				<span class="text-center text-4xl font-bold" style="color: {data.second_color_palette}">
					{data.name}
				</span><br />
			</div>
		</div>
	</div>
</div>
<!-- Tutte le foto da caricare -->
<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
		<!--<h2 class="text-left text-2xl font-black">{data.name}</h2>-->
		<div class="flex justify-between">
			<a href="." class="text-left text-md text-2xl font-black">{$_('go_to_race')}</a>
			{#if data.status}
				<form
					action="?/download_round"
					method="POST"
					use:enhance={({ formElement, formData, action, cancel }) => {
						isLoading = true;
						return async ({ result }) => {
							if (result.type === 'success') {
								const blobData = b64toBlob(result.data.body);
								const url = URL.createObjectURL(blobData);

								// generate anchor tag, click it for download and then remove it again
								let a = document.createElement('a');
								a.setAttribute('download', `image.zip`);
								a.setAttribute('href', url);
								document.body.appendChild(a);
								a.click();
								document.body.removeChild(a);
								isLoading = false;
							}
						};
					}}
				>
					<button
						class="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
						style="background-color: {data.second_color_palette}; hover:background-color: {data.second_color_palette}"
					>
						<svg
							class="fill-current w-4 h-4 mr-2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg
						>
						<span>{$_('download_album')}</span>
					</button>
				</form>
			{/if}
		</div>

		<div
			class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 py-8"
			id="lightgallery"
		>
			{#each data.arrayLinks as images}
				{#if images.type == 'image'}
					<a
						href={images.link}
						class="gallery-item"
						data-src={images.link}
						data-download-url={images.downloadlink}
						data-sub-html="<h4>Photo by - PH24 - ID: {images.name}</h4> <p> Location - {data.name}</p>"
						><img alt="immagine round" class="img-fluid" src={images.link} />
					</a>
				{:else}
					<a
						data-lg-size="1280-720"
						data-video={images.source}
						data-poster={logo}
						data-sub-html="<h4>Real by PH24</h4> <p> Location - {data.name}</p>"
					>
						<img width="300" height="100" class="img-responsive" src={logo} alt="video real" />
					</a>
				{/if}
			{/each}
		</div>
	</div>

	{#if data.IsTruncated == true}
		<div class="text-center py-5">
			<a
				href="{currentPage}?token={data.key}"
				class="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
				style="background-color: {data.second_color_palette}; hover:background-color: {data.second_color_palette}"
			>
				<span>{$_('load_more')}</span>
			</a>
		</div>
	{/if}
</div>

{#if isLoading}
	<div class="loading-screen">
		<!-- Customize your loading screen here -->
		<p>{$_('loading_text')}</p>
	</div>
{/if}

<Comments
	comments={data.comments}
	first_color_palette={data.first_color_palette}
	second_color_palette={data.second_color_palette}
/>

<!-- FOOTER -->
<Footer
	first_color_palette={data.first_color_palette}
	second_color_palette={data.second_color_palette}
	primary_text_palette={data.primary_text_palette}
	second_text_palette={data.second_text_palette}
/>

<style>
	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		color: white;
		font-size: 24px;
	}
</style>
