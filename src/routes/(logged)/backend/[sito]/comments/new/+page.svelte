<script>
	export let data;
	import { superForm } from 'sveltekit-superforms/client';
	import HeaderBack from '$lib/templates/headerBack.svelte';
	let isLoadingText = false;
	const { form, errors, constraints, enhance, message } = superForm(data.firstPart, {
		id: 'form1',
		onSubmit: ({ data }) => {
			isLoadingText = true;
		},
		onResult({ result }) {
			isLoadingText = false;
		}
	});
	const {
		form: infoForm,
		errors: infoErrors,
		constraints: infoConstraints,
		message: messageFinal,
		enhance: enhanceFinal
	} = superForm(data.secondPart, {
		id: 'form2'
	});
	import { _ } from 'svelte-i18n';
	$: ({ content } = data);
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link
		href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<HeaderBack sito={data.username} />
<!--Container-->
<div class="container w-full mx-auto px-2 lg:pt-8 mt-8">
	<!--Section container-->
	<section class="w-full">
		<!--Title-->
		<h1 class="font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
			{$_('new_comment')}
		</h1>

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<!--Card-->
		<div id="section3" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			{#if $messageFinal}
				{#if $page.status >= 200 && $page.status <= 299}
					<div
						class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
					>
						{$messageFinal}
					</div>
				{:else}
					<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
						{$messageFinal}
					</div>
				{/if}
			{/if}
			<form class="mb-5" method="POST" action="?/new" use:enhance>
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="id_race"
						>
							{$_('race')}
						</label>
					</div>
					<div class="md:w-2/3">
						<select
							class="form-select block w-full focus:bg-white"
							id="id_race"
							name="id_race"
							data-invalid={$errors.id_race}
							bind:value={$form.id_race}
							{...$constraints.id_race}
						>
							{#each content.races_available as race}
								<option value={race.id}><span class="capitalize">{race.name}</span></option>
							{/each}
						</select>

						<p class="py-2 text-sm text-gray-600">
							{#if $errors.id_race}
								{$errors.id_race}
							{/if}
						</p>
					</div>
				</div>

				<!-- Select Language-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="language"
						>
							{$_('language')}
						</label>
					</div>
					<div class="md:w-2/3">
						<select
							class="form-select block w-full focus:bg-white"
							id="language"
							name="id_language"
							data-invalid={$errors.id_language}
							bind:value={$form.id_language}
							{...$constraints.id_language}
						>
							{#each content.languages as language}
								<option value={language.id}><span class="capitalize">{language.name}</span></option>
							{/each}
						</select>
						<p class="py-2 text-sm text-gray-600">
							{#if $errors.id_language}
								{$errors.id_language}
							{/if}
						</p>
					</div>
				</div>

				<!-- Write Name of who write-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="name">
							{$_('name')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							type="text"
							class="form-textarea block w-full focus:bg-white"
							id="name"
							name="name_person"
							data-invalid={$errors.name_person}
							bind:value={$form.name_person}
							{...$constraints.name_person}
						/>
						<p class="py-2 text-sm text-gray-600">
							{#if $errors.name_person}
								{$errors.name_person}
							{/if}
						</p>
					</div>
				</div>

				<!-- Write position of who write-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="position"
						>
							{$_('position')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							type="text"
							class="form-textarea block w-full focus:bg-white"
							id="position"
							data-invalid={$errors.position}
							bind:value={$form.position}
							{...$constraints.position}
							name="position"
						/>
						<p class="py-2 text-sm text-gray-600">
							{#if $errors.position}
								{$errors.position}
							{/if}
						</p>
					</div>
				</div>

				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="position"
						>
							{$_('posizione_partenza')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							type="number"
							class="form-textarea block w-full focus:bg-white"
							id="number_start"
							data-invalid={$errors.number_start}
							bind:value={$form.number_start}
							{...$constraints.number_start}
							name="number_start"
						/>
						<p class="py-2 text-sm text-gray-600">
							{#if $errors.position}
								{$errors.position}
							{/if}
						</p>
					</div>
				</div>

				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="position"
						>
							{$_('posizione_arrivo')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							type="number"
							class="form-textarea block w-full focus:bg-white"
							id="number_arrive"
							data-invalid={$errors.number_arrive}
							bind:value={$form.number_arrive}
							{...$constraints.number_arrive}
							name="number_arrive"
						/>
						<p class="py-2 text-sm text-gray-600">
							{#if $errors.position}
								{$errors.position}
							{/if}
						</p>
					</div>
				</div>

				<!-- Write Text-->
				{#if !$message}
					<div class="md:flex md:items-center">
						<div class="md:w-1/3" />
						<div class="md:w-2/3">
							{#if isLoadingText}
								<div
									class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
								>
									{$_('text_generation')}
								</div>
							{:else}
								<p>{$_('generate_gpt_subtext')}</p>
							{/if}
							<button
								class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							>
								{$_('generate_gpt')}
							</button>
						</div>
					</div>
				{/if}
			</form>
			{#if $message}
				<form method="POST" use:enhanceFinal action="?/confirm">
					<input type="text" style="display:none" name="id_language" value={$form.id_language} />
					<input
						type="text"
						style="display:none"
						id="position"
						value={$form.position}
						name="position"
					/>
					<input
						type="text"
						style="display:none"
						id="name_person"
						value={$form.name_person}
						name="name_person"
					/>
					<input type="text" style="display:none" name="id_race" value={$form.id_race} />

					<div class="md:flex mb-6">
						<div class="md:w-1/3">
							<label
								class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
								for="text"
							>
								{$_('description')}
							</label>
						</div>
						<div class="md:w-2/3">
							<textarea
								class="form-textarea block w-full focus:bg-white"
								id="text"
								rows="6"
								data-invalid={$errors.text_message}
								value={$message}
								{...$constraints.text_message}
								name="text_message"
							/>

							<p class="py-2 text-sm text-gray-600">
								{#if $errors.text_message}
									{$errors.text_message}
								{/if}
							</p>
						</div>
					</div>

					<div class="md:flex md:items-center">
						<div class="md:w-1/3" />
						<div class="md:w-2/3">
							<button
								class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							>
								{$_('save')}
							</button>
						</div>
					</div>
				</form>
			{/if}
		</div>
		<!--/Card-->

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<!--Title-->
		<h2 class="font-bold break-normal text-gray-700 px-2 pb-8 text-xl">{$_('disclaimer')}</h2>

		<!-- Disclaimer-->
		<div id="section5" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<blockquote class="border-l-4 border-yellow-600 italic my-4 pl-8 md:pl-12">
				{$_('text_disclaimer')}
			</blockquote>
		</div>
		<!--/Card-->
	</section>
	<!--/Section container-->

	<!--Back link -->
	<div class="w-full text-base md:text-sm text-gray-600 px-4 py-24 mb-12">
		<span class="text-base text-yellow-600 font-bold">&lt;</span>
		<a href="." class="text-base md:text-sm text-yellow-600 font-bold no-underline hover:underline"
			>{$_('back_home_site')}</a
		>
	</div>
</div>
