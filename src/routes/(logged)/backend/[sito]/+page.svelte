<script>
	export let data, form;
	import FilePond, { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import { superForm } from 'sveltekit-superforms/client';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import HeaderBack from '$lib/templates/headerBack.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Select from 'svelte-select';

	const {
		form: infoForm,
		errors: infoErrors,
		constraints: infoConstraints,
		message: infoMessage,
		enhance: infoEnhance
	} = superForm(data.form, {
		id: 'form1'
	});

	const {
		form: colorForm,
		errors: colorErrors,
		constraints: colorConstraints,
		message: colorMessage,
		enhance: colorEnhance
	} = superForm(data.form, {
		id: 'form2'
	});
	const {
		form: textForm,
		errors: textErrors,
		constraints: textConstraints,
		enhance: textEnhance,
		message: textMessage
	} = superForm(data.form, {
		id: 'form3'
	});
	const {
		form: socialForm,
		errors: socialErrors,
		constraints: socialConstraints,
		enhance: socialEnhance,
		message: socialMessage
	} = superForm(data.form, {
		id: 'form4'
	});

	const {
		form: contactForm,
		errors: contactErrors,
		constraints: contactConstraints,
		message: contactMessage,
		enhance: contactEnhance
	} = superForm(data.form, {
		id: 'form5'
	});

	const {
		form: contactUpdatetForm,
		errors: contactUpdateErrors,
		constraints: contacUpdateConstraints,
		message: contactUpdateMessage,
		enhance: contactUpdateEnhance
	} = superForm(data.form, {
		id: 'form6'
	});

	//$: ({ user, data.content } = data);

	// Register the plugins
	registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

	// a reference to the component, used to call FilePond methods
	let pond;
	let pond_championship;
	// pond.getFiles() will return the active files

	// the name to use for the internal file input
	let name = 'filepond';

	// handle filepond events
	function handleInit() {
		console.log('FilePond has initialised');
	}

	function handleAddFile(err, fileItem) {
		console.log('A file has been added', fileItem);
	}
	onMount(() => {
		//single uploader
		const image_profile = document.querySelector('#profile_uploader');
		var profile = '';
		image_profile.addEventListener('change', function () {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				profile = reader.result;
				document.querySelector('#image_profile').src = profile;
			});
		});
		console.log(data);
	});

	const itemId = 'id';
	const label = 'title';
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	<link
		href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
		rel="stylesheet"
	/>
	<title>{$_('siti_gestione')}</title>
</svelte:head>

<HeaderBack sito={data.username} />

<!--Container-->
<div class="container w-full mx-auto px-2 pt-8 lg:pt-8 mt-8">
	<!--Section container-->
	<section class="w-full">
		<!-- Date expire-->
		<div class="p-8 mb-6 leading-normal rounded shadow bg-white">
			{#if data.content.status != 'pay'}
				{$_('trial_date', { values: { date: data.deadline } })} - <a href="">{$_('buy_trial')}</a>
			{:else}
				{$_('end_site_date', { values: { date: data.content.deadline } })}
			{/if}
		</div>

		<!--Photo Profile-->
		<div class="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white">
			<div class="col-span-6 ml-2 sm:col-span-4 md:mr-3">
				<p class=" text-sm font-bold mb-2 text-center" for="photo">
					{$_('photo_profile')}<span class="text-red-600" />
				</p>

				<div class="text-center">
					<!-- Current Profile Photo -->
					<div class="mt-2">
						<img
							src={data.content.image}
							class="w-40 h-40 m-auto rounded-full shadow"
							alt=""
							id="image_profile"
						/>
					</div>
					<!-- New Profile Photo Preview -->
					<div class="mt-2" x-show="photoPreview" style="display: none;">
						<span
							class="block w-40 h-40 rounded-full m-auto shadow"
							style="background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url('null');"
						/>
					</div>
					<form action="?/profile" method="POST" enctype="multipart/form-data">
						{#if form?.type == 'profile'}
							{#if form?.error}
								<div
									class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
								>
									{form?.message}
								</div>
							{:else}
								<div
									class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								>
									{form?.message}
								</div>
							{/if}
						{/if}
						<label>
							<input
								type="file"
								id="profile_uploader"
								name="profile"
								class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
							/></label
						>

						<!-- Save Button-->

						<button
							class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
						>
							{$_('save')}
						</button>
					</form>
					<span class="mt-2 text-orange-600">{$_('pp_dimension')}</span>
				</div>
				
			</div>
		</div>
		<!--/Card-->

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<!--Title General-->
		<h2 class="font-bold px-2 pb-8 text-xl">{$_('primo_blocco')}</h2>

		<!--General -->
		<div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<form action="?/info" method="POST" use:infoEnhance>
				{#if $infoMessage}
					{#if $page.status >= 200 && $page.status <= 299}
						<div
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
						>
							{$infoMessage}
						</div>
					{:else}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{$infoMessage}
						</div>
					{/if}
				{/if}

				<!-- Height-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="height"
						>
							{$_('height')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="height"
							name="height"
							type="number"
							step="0.01"
							value={data.content.height}
						/>
						<p class="py-2 text-sm text-gray-600" />
						{#if $infoErrors.height}<span class="invalid">{$infoErrors.height}</span>{/if}
					</div>
				</div>

				<!-- country -->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="country"
						>
							{$_('nationality')}
						</label>
					</div>
					<div class="md:w-2/3">
						<Select
							{itemId}
							{label}
							items={data.content.flags}
							searchable={true}
							name="country"
							value={data.content.country}
						/>

						{#if $infoErrors.country}<span class="invalid">{$infoErrors.country}</span>{/if}
					</div>
				</div>

				<!-- birth_date -->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="birth_date"
						>
							{$_('birth_date')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="birth_date"
							type="date"
							name="birth_date"
							value={data.content.date_birth}
						/>
						{#if $infoErrors.date_birth}<span class="invalid">{$infoErrors.date_birth}</span>{/if}
					</div>
				</div>

				<!-- birth_date -->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="custom_text"
						>
							{$_('custom_text')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="custom_text"
							type="text"
							name="custom_text"
							value={data.content.custom_text}
						/>
						{#if $infoErrors.custom_text}<span class="invalid">{$infoErrors.custom_text}</span>{/if}
					</div>
				</div>

				<!-- Save Button-->
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
		</div>

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<!--Title General-->
		<h2 class="font-bold px-2 pb-8 text-xl">{$_('color_info')}</h2>

		<!--General -->
		<div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<form action="?/color" method="POST" use:colorEnhance>
				{#if $colorMessage}
					{#if $page.status >= 200 && $page.status <= 299}
						<div
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
						>
							{$colorMessage}
						</div>
					{:else}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{$colorMessage}
						</div>
					{/if}
				{/if}

				<!-- Colore Primario-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="first_color_palette"
						>
							{$_('colore_primario')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="first_color_palette"
							name="first_color_palette"
							type="color"
							value={data.content.first_color_palette}
						/>
						<p class="py-2 text-sm text-gray-600" />
						{#if $colorErrors.first_color_palette}<span class="invalid"
								>{$colorErrors.first_color_palette}</span
							>{/if}
					</div>
				</div>

				<!-- Second color -->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="second_color"
						>
							{$_('second_color')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="second_color"
							name="second_color_palette"
							type="color"
							value={data.content.second_color_palette}
						/>
						{#if $colorErrors.second_color_palette}<span class="invalid"
								>{$colorErrors.second_color_palette}</span
							>{/if}
					</div>
				</div>

				<!-- birth_date -->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="primary_color_text"
						>
							{$_('primary_color_text')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="primary_color_text"
							type="color"
							name="primary_text_palette"
							value={data.content.primary_text_palette}
						/>
						{#if $infoErrors.primary_text_palette}<span class="invalid"
								>{$infoErrors.primary_text_palette}</span
							>{/if}
					</div>
				</div>

				<!-- birth_date -->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
							for="second_text_palette"
						>
							{$_('second_text_palette')}
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="second_text_palette"
							type="color"
							name="second_text_palette"
							value={data.content.second_text_palette}
						/>

						{#if $infoErrors.second_text_palette}<span class="invalid"
								>{$infoErrors.second_text_palette}</span
							>{/if}
					</div>
				</div>

				<!-- Save Button-->
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
		</div>

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<!--Title Social-->
		<h2 class="font-bold break-normal text-gray-700 px-2 pb-8 text-xl">{$_('Social')}</h2>

		<!--Text Social-->
		<div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<form method="POST" action="?/social" use:socialEnhance>
				{#if $socialMessage}
					{#if $page.status >= 200 && $page.status <= 299}
						<div
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
						>
							{$socialMessage}
						</div>
					{:else}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{$socialMessage}
						</div>
					{/if}
				{/if}
				<!-- Instagram-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4 capitalize"
							for="instagram"
						>
							Instagram
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="instagram"
							type="text"
							value={data.content.instagram.url}
							name="instagram"
						/>
						{#if $infoErrors.instagram}<span class="invalid">{$infoErrors.instagram}</span>{/if}
					</div>
				</div>

				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4 capitalize"
							for="facebook"
						>
							Facebook
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input w-full focus:bg-white"
							id="facebook"
							type="text"
							value={data.content.facebook.url}
							name="facebook"
						/>
						{#if $infoErrors.facebook}<span class="invalid">{$infoErrors.facebook}</span>{/if}
					</div>
				</div>

				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4 capitalize"
							for="twitter"
						>
							Twitter
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input w-full focus:bg-white"
							id="twitter"
							type="text"
							value={data.content.twitter.url}
							name="twitter"
						/>
						{#if $infoErrors.twitter}<span class="invalid">{$infoErrors.twitter}</span>{/if}
					</div>
				</div>

				<!-- Save Button-->
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
		</div>
		<!--/Card-->

		<!--divider-->
		<hr class="bg-gray-300 my-12" />
		{#if data.content.language.length != 0}
			{#each data.content.language as language}
				<h2 class="font-bold break-normal text-gray-700 px-2 pb-8 text-xl capitalize">
					{language.name}
				</h2>

				<!--Card-->
				<div id="section3" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
					<form method="POST" use:textEnhance action="?/text">
						{#if $textMessage}
							{#if $page.status >= 200 && $page.status <= 299}
								<div
									class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
								>
									{$textMessage}
								</div>
							{:else}
								<div
									class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								>
									{$textMessage}
								</div>
							{/if}
						{/if}
						<input type="text" value={language.id} style="display:none" name="language" />
						<div class="md:flex mb-6">
							<div class="md:w-1/3">
								<label
									class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
									for="text_{language.name}"
								>
									{$_('description')}
								</label>
							</div>
							<div class="md:w-2/3">
								<textarea
									class="form-textarea block w-full focus:bg-white"
									id="text_{language.name}"
									name="text"
									value={data.content.description[language.id]}
									rows="8"
									{...textConstraints.language}
								/>
								<p class="py-2 text-sm text-gray-600">{$_('description_info')}</p>
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
				</div>
				<!--/Card-->

				<!--divider-->
				<hr class="bg-gray-300 my-12" />
			{/each}
		{/if}

		<!--Title-->
		<h2 class="font-bold break-normal text-gray-700 px-2 pb-8 text-xl">{$_('sponsor_list')}<br><span class="font-normal text-base">{$_("png_suggested")}</span></h2>

		<!--Sponsor-->
		<div id="section3" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<div class="grid grid-cols-3">
				{#each data.content.sponsor as sponsor}
					<form action="?/remove_sponsor" method="POST" use:enhance>
						{#if form?.error != undefined && form?.type == 'sponsor'}
							{#if form?.error}
								<div
									class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
								>
									{form?.message}
								</div>
							{:else}
								<div
									class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								>
									{form?.message}
								</div>
							{/if}
						{/if}
						<input type="text" name="image_name" value={sponsor.name} style="display:none" />
						<img
							src={sponsor.url}
							class="w-64 h-24 object-cover shadow"
							alt=""
							id="image_profile"
						/>
						<button class="mx-auto p-2">{$_('remove')}</button>
					</form>
				{/each}
			</div>
			<div class="app">
				{#if form?.error != undefined && form?.type == 'sponsor_load'}
					{#if form?.error}
						<div
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
						>
							{form?.message}
						</div>
					{:else}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{form?.message}
						</div>
					{/if}
				{/if}
				<FilePond
					bind:this={pond}
					{name}
					server="?/sponsor"
					allowMultiple={true}
					oninit={handleInit}
					onaddfile={handleAddFile}
					allowRevert="false"
				/>
			</div>
		</div>
		<!--/Card-->

		<!--Title-->
		<h2 class="font-bold break-normal text-gray-700 pt-7 px-2 pb-8 text-xl">
			{$_('championship_list')}
			<br><span class="font-normal text-base">{$_("png_suggested")}</span>
		</h2>

		<!--championship-->
		<div id="section3" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<div class="grid grid-cols-3">
				{#each data.content.championship as sponsor}
					<form action="?/remove_championship" method="POST" use:enhance>
						{#if form?.error != undefined && form?.type == 'sponsor'}
							{#if form?.error}
								<div
									class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
								>
									{form?.message}
								</div>
							{:else}
								<div
									class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								>
									{form?.message}
								</div>
							{/if}
						{/if}
						<input type="text" name="image_name" value={sponsor.name} style="display:none" />
						<img
							src={sponsor.url}
							class="w-64 h-24 object-cover shadow"
							alt=""
							id="image_profile"
						/>
						<button class="m-auto">{$_('remove')}</button>
					</form>
				{/each}
			</div>
			<div class="app">
				{#if form?.error != undefined && form?.type == 'championship_load'}
					{#if form?.error}
						<div
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
						>
							{form?.message}
						</div>
					{:else}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{form?.message}
						</div>
					{/if}
				{/if}
				<FilePond
					bind:this={pond_championship}
					{name}
					server="?/championship"
					allowMultiple={true}
					oninit={handleInit}
					onaddfile={handleAddFile}
					allowRevert="false"
				/>
			</div>
		</div>

		<!--divider-->
		<hr class="bg-gray-300 my-12" />

		<!--Title-->
		<h2 class="font-bold break-normal text-gray-700 px-2 pb-8 text-xl">{$_('contact_info')}</h2>

		<div id="section2" class="p-8 mb-6 rounded shadow bg-white">
			{#if data.content.contact_info.length != 0}
				{#if $contactUpdateMessage}
					{#if $page.status > 300}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{$contactUpdateMessage}
						</div>
					{/if}
					{#if $infoMessage}
						{#if $page.status >= 200 && $page.status <= 299}
							<div
								class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
							>
								{$infoMessage}
							</div>
						{/if}
					{/if}
				{/if}
				{#each data.content.contact_info as contact}
					<form method="POST" action="?/contactUpdate" use:contactUpdateEnhance>
						<div class="flex justify-between w-full pb-3">
							<div class="hidden">
								<label for="id">id</label>
								<input
									type="text"
									name="id"
									value={contact.id}
									class="form-input block w-full focus:bg-white"
								/>
							</div>
							<label for="name_update" class="hidden">Name</label>
							<input
								id="name_update"
								type="text"
								class="form-input focus:bg-white"
								value={contact.name}
								name="name"
							/>
							<label for="telephone_update" class="hidden">Telephone</label>
							<input
								id="telephone_update"
								type="text"
								class="form-input focus:bg-white"
								name="telephone"
								value={contact.telephone}
							/>
							<label for="email_update" class="hidden">Email</label>
							<input
								id="email_update"
								type="text"
								name="email"
								class="form-input focus:bg-white"
								value={contact.email}
							/>
							<div class="">
								<label for="remove_update">{$_('remove')} </label>
								<input id="remove_update" type="checkbox" class="" name="remove" />
							</div>
							<button
								class="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							>
								{$_('update')}
							</button>
						</div>
					</form>
				{/each}
			{:else}
				{$_('no_contacts')}
			{/if}
		</div>

		<h2 class="font-bold break-normal text-gray-700 px-2 pb-8 text-xl">{$_('add_contact')}</h2>

		<div id="section2" class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<form method="POST" action="?/contact_info" use:contactEnhance>
				{#if $contactMessage}
					{#if $page.status >= 200 && $page.status <= 299}
						<div
							class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-10 rounded relative"
						>
							{$contactMessage}
						</div>
					{:else}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							{$contactMessage}
						</div>
					{/if}
				{/if}
				<!-- Instagram-->
				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4 capitalize"
							for="name_contact"
						>
							Name Contact
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input block w-full focus:bg-white"
							id="name_contact"
							type="text"
							bind:value={$contactForm.name}
							name="name"
						/>
						{#if $contactErrors.name}<span class="invalid">{$contactErrors.name}</span>{/if}
					</div>
				</div>

				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4 capitalize"
							for="telephone_contact"
						>
							Telephone
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input w-full focus:bg-white"
							id="telephone_contact"
							type="text"
							bind:value={$contactForm.telephone}
							name="telephone"
						/>
						{#if $contactErrors.telephone}<span class="invalid">{$contactErrors.telephone}</span
							>{/if}
					</div>
				</div>

				<div class="md:flex mb-6">
					<div class="md:w-1/3">
						<label
							class="text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4 capitalize"
							for="mail_contact"
						>
							Email
						</label>
					</div>
					<div class="md:w-2/3">
						<input
							class="form-input w-full focus:bg-white"
							id="mail_contact"
							type="email"
							bind:value={$contactForm.mail}
							name="email"
						/>
						{#if $contactErrors.mail}<span class="invalid">{$contactErrors.mail}</span>{/if}
					</div>
				</div>

				<!-- Save Button-->
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
		</div>

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
	<div class="w-full lg:ml-auto text-base md:text-sm text-gray-600 px-4 py-24 mb-12">
		<span class="text-base text-yellow-600 font-bold">&lt;</span>
		<a href=".." class="text-base md:text-sm text-yellow-600 font-bold no-underline hover:underline"
			>{$_('back_sites')}</a
		>
	</div>
</div>

<style global>
	@import 'filepond/dist/filepond.css';
	@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>
