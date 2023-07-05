<script>
	export let data;
	import { superForm } from 'sveltekit-superforms/client';
	const { form, errors, constraints, enhance } = superForm(data.form);
	import { _ } from 'svelte-i18n';
	import HeaderBack from '../../../../../lib/templates/headerBack.svelte';
	$: ({ user, content } = data);
</script>

<svelte:head>
	<link
		href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
		rel="stylesheet"
	/>
	<title>{$_('list_race')}</title>
</svelte:head>

<HeaderBack sito={data.username} />
<!--Container-->
<div class="container w-full mx-auto px-2 lg:pt-8 mt-4">
	<!--Section container-->
	<section class="w-full">
		<!--Title-->
		<h1 class="font-bold break-normal text-[#171817] px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
			{$_('list_race')}
			<!-- "svelte-i18n is awesome" -->
		</h1>

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<div class="flex justify-between">
			<div>
				<span class="text-base text-yellow-600 font-bold">&lt;</span>
				<a
					href="."
					class="text-base md:text-sm text-yellow-600 font-bold no-underline hover:underline"
					>{$_('back_home_site')}</a
				>
			</div>
			<section class="text-right">
				<a
					href="./comments/new"
					class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded"
				>
					{$_('new_comment')}
				</a>
			</section>
		</div>

		{#if content.races.length != 0}
			{#each content.races as race}
				<h2 class="font-bold break-normal text-[#171817] px-2 py-5 text-xl">
					<span class="capitalize">{race.race.name}</span>
				</h2>
				<!--Card-->
				{#each race.comments as comment}
					<div id="section3" class="px-8 py-4 mb-6 rounded shadow bg-white">
						<b class="capitalize">{comment.language.name}</b><br />
						{comment.text}
						<div class="flex">
							<a
								href="./comments/modify/{comment.id}"
								class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 my-1 rounded"
							>
								{$_('modify_comment_text')}
							</a>
						</div>
					</div>
				{/each}
				<!--/Card-->

				<!--divider-->
				<hr class="bg-gray-300 my-2" />
			{/each}
		{:else}
			{$_('no_races')}
		{/if}
	</section>
	<!--/Section container-->

	<!--Back link -->
	<div class="w-full lg:ml-auto text-base md:text-sm text-gray-600 px-4 py-24 mb-12">
		<span class="text-base text-yellow-600 font-bold">&lt;</span>
		<a href="." class="text-base md:text-sm text-yellow-600 font-bold no-underline hover:underline"
			>{$_('back_home_site')}</a
		>
	</div>
</div>
