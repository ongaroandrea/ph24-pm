<script>
	//import '@skeletonlabs/skeleton/styles/all.css';

	export let data;
	import { _ } from 'svelte-i18n';
	$: ({ user, content } = data);
	import '@beyonk/gdpr-cookie-consent-banner/style.css'; // optional, you can also define your own styles
	import { Banner as GdprBanner } from '@beyonk/gdpr-cookie-consent-banner';

	function initAnalytics() {
		// do something with segment.io or google analytics etc
	}
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="../../node_modules/@fortawesome/fontawesome-free/css/all.css" rel="stylesheet" />
	<title>{$_('siti_gestione')}</title>
</svelte:head>
<div class="container h-screen mx-auto">
	<div class="mt-10">
		<h1 class="flex items-center font-bold break-normal px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
			{$_('title_name', { values: { name: user.email } })}
			<!-- "svelte-i18n is awesome" -->
		</h1>

		<!--divider-->
		<hr class="bg-gray-300 mt-6 mb-12" />
	</div>
	<div class="flex flex-col items-center justify-center p-10">
		<h1 class="text-center text-6xl font-bold py-10">{$_('siti_gestione')}</h1>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{content.properties > 2
				? 4
				: content.properties == 2
				? 2
				: 1} gap-6"
		>
			{#each content.properties as prop}
				<div class="flex justify-center border-2 border-gray-300 rounded-xl p-10 bg-gray-100">
					<a
						href="./backend/{prop.sites.id}"
						alt="Link to access site"
						class="text-2xl capitalize font-bold">{prop.sites.url}</a
					>
				</div>
			{/each}
		</div>
	</div>
</div>

<GdprBanner cookieName="foo" description="This site use only" on:analytics={initAnalytics} />
