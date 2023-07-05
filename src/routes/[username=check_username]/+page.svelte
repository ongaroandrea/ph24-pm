<script>
	import '@fortawesome/fontawesome-free/css/all.css';
	import dots from '$lib/images/01-bianco.png';
	import Footer from '$lib/templates/footer.svelte';
	import Sponsor from '$lib/templates/sponsor.svelte';
	import Contact from '$lib/templates/contact.svelte';
	import Race from '$lib/templates/race.svelte';
	import { _ } from 'svelte-i18n';
	import Championship from '$lib/templates/championship.svelte';
	import Rounds from '../../lib/templates/rounds.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{$_('custom_page')} {data.username.toUpperCase()}</title>
	<meta name="description" content="Pagina personalizzata di {data.username.toUpperCase()}">
</svelte:head>
<main>
	<nav class="bg-white shadow-lg">
		<!-- PRESENTATION SECTION-->
		<section
			class="w-full justify-center items-center hidden lg:flex"
			style="height: 100vh; background-color: {data.first_color_palette}"
		>
			<div class="columns-2" style=" z-index: 3">
				<div>
					<div class="pl-20">
						<div
							class="text-[110px] pl-10 font-bold italic leading-none" style="color: {data.primary_text_palette}"
						>
							{data.name}
						</div>
						<div class="pt-20">
							{#if data.nationality.name != '' && data.nationality.name != null}
								<div class="text-[25px]">
									<div class="flex h-auto p-2" style="color: {data.primary_text_palette}">
										<div class="w-1" style="background-color: {data.second_color_palette}"/>
										<div class="pl-[20px]">{$_('nationality')}</div>

										<span class="pl-[40px] text-4xl">{data.nationality.flag}</span>
										<span class="">{data.nationality.name}</span>
									</div>
									<span class="" />
								</div>
							{/if}
							{#if data.born != '' && data.born != null}
								<div class="text-[25px]">
									<div class="flex h-auto p-2" style="color: {data.primary_text_palette}">
										<div class="w-1" style="background-color: {data.second_color_palette}"/>
										<div class="pl-[20px]">{$_('born')}</div>
										<span class="pl-[55px]">{data.born}</span>
									</div>
									<span class="" />
								</div>
							{/if}
							{#if data.height != '' && data.height != null}
								<div class="text-[25px]">
									<div class="flex h-auto p-2" style="color: {data.primary_text_palette}">
										<div class="w-1" style="background-color: {data.second_color_palette}"/>
										<div class="pl-[20px]">{$_('height')}</div>
										<span class="pl-[92px]">{data.height} CM</span>
									</div>
									<span class="" />
								</div>
							{/if}
						</div>
						<div class="social pl-2 pt-2">
							{#if data.instagram != '' && data.instagram != null}
								<a href={data.instagram} target="_blank"
									><i
										class="fa-brands fa-instagram fa-3x pr-2"
										style="color: {data.second_color_palette}; height:30px; z-index:10"
									/></a
								>
							{/if}
							{#if data.facebook != '' && data.facebook != null}
								<a href={data.facebook} target="_blank"
									><i
										class="fa-brands fa-facebook fa-3x pr-2"
										style="color: {data.second_color_palette}; height:30px;z-index:10"
									/></a
								>
							{/if}
							{#if data.twitter != '' && data.twitter != null}
								<a href={data.twitter} target="_blank"
									><i
										class="fa-brands fa-twitter fa-3x"
										style="color: {data.second_color_palette}; height:30px;z-index:10"
									/></a
								>
							{/if}
						</div>
					</div>
					<div class="relative pt-10 pr-10" style=" z-index: 3">
						<div class="flex justify-end">
							<div class="">
								<img
									class="absolute top-0 w-100"
									src={dots}
									alt=""
									style="z-index: -8; opacity:0.4; left: -60px"
								/>
								<div
									class="rounded-full overflow-hidden border-solid border-2 border-[#171819]"
									style="z-index: 10; width: 25rem"
								>
									<img src={data.image} alt="foto profilo atleta" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<p
				class="text-left text-6xl jtp left-0 italic"
				style="position: absolute; overflow-x: hidden; truncate"
			>
				{data.custom_text}
			</p>
		</section>

		<div class="mobile lg:hidden">
			<section class="px-10 py-5" style="background-color: {data.first_color_palette}">
				<span class="text-6xl font-bold italic" style="color: {data.primary_text_palette}"
					>{data.firstname} <br /> {data.surname}</span
				>
			</section>

			<div class="h-1/4" style="">
				<img src={data.image_mobile} class="image_tablet object-cover" alt="foto profilo atleta" />
			</div>
			<div class="container w-64">
				<div class="relative">
					<p
						class="text-left text-6xl mobile-jtp left-0 italic overflow-hidden"
						style="position: absolute; z-index:0"
					>
						{data.custom_text}
					</p>
				</div>
			</div>

			<div class="" style="background-color: {data.first_color_palette}">
				<div class="social p-5 text-right absolute" style="right:0px">
					{#if data.instagram != '' && data.instagram != null}
						<a href={data.instagram} target="_blank" aria-label="Personal link instagram"
							><i
								class="fa-brands fa-instagram fa-3x pr-2"
								style="color: {data.second_color_palette}; height:30px; z-index:10"
							/></a
						>
					{/if}
					{#if data.facebook != '' && data.facebook != null}
						<a href={data.facebook} target="_blank" aria-label="Personal link facebook"
							><i
								class="fa-brands fa-facebook fa-3x pr-2"
								style="color: {data.second_color_palette}; height:30px;z-index:10"
							/></a
						>
					{/if}
					{#if data.twitter != '' && data.twitter != null}
						<a href={data.twitter} target="_blank" aria-label="Personal link twitter"
							><i
								class="fa-brands fa-twitter fa-3x"
								style="color: {data.second_color_palette}; height:30px;z-index:10"
							/></a
						>
					{/if}
				</div>

				<div class="pt-44">
					<hr class="w-full h-1 mx-auto my-4 bg-[{data.second_color_palette}] border-0 rounded" />
					<div class="flex justify-center text-[{data.primary_text_palette}] py-24">
						<div class="w-full grid grid-cols-2 text-[30px] mx-8">
							{#if data.nationality.name != '' && data.nationality.name != null}
								<div class="flex items-center border-b border-y-gray-500">
									<p>{$_('nationality')}</p>
								</div>
								<div class="flex items-center justify-end font-bold border-b border-y-gray-500">
									<span class="pl-[30px] text-4xl">{data.nationality.flag}</span>
								</div>
							{/if}
							{#if data.born != '' && data.born != null}
								<div class="flex items-center border-b border-y-gray-500">
									<p>{$_('born')}</p>
								</div>

								<div class="flex items-center justify-end font-bold border-b border-y-gray-500">
									<p>{data.born}</p>
								</div>
							{/if}
							{#if data.height != '' && data.height != null}
								<div class="flex items-center border-b border-y-gray-500">
									<p>{$_('height')}</p>
								</div>
								<div class="flex items-center justify-end font-bold border-b border-y-gray-500">
									<p>{data.height} CM</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<!-- ABOUT SECTION -->
	<div
		class="w-full hidden lg:block"
		style="background-color: {data.first_color_palette}; color: {data.primary_text_palette}"
	>
		<!-- LINEA -->
		<div class="w-full" style="background-color: {data.second_color_palette}; height: 40px;">&nbsp;</div>
		<div class="grid grid-cols-1 md:grid-cols3 lg:grid-cols-2 px-40 py-8 gap-5">
			{#if data.about != ''}
				<div class="col-span-2">
					<h1 class="text-[48px] font-bold italic" style="color: {data.second_color_palette}">
						{$_('about')}
					</h1>
					<p>
						{data.about}
					</p>
				</div>
			{/if}
			{#if data.team}
				<div class="col-span-1 p-30">
					<div class="bg-[#3d3d3d] px-10 py-10">
						<span class="text-2xl font-bold">TEAM</span><br />
						<span class="">{data.team}</span>
					</div>
				</div>
			{/if}
		</div>
	</div>

	{#if data.about || data.team}
		<div class="visible lg:hidden">
			{#if data.about}
				<div class="mx-10 py-12">
					<h1 class="text-[48px] font-bold italic" style="color: {data.second_color_palette}">
						{$_('about')}
					</h1>
					<p>
						{data.about}
					</p>
				</div>
			{/if}
			{#if data.team}
				<div class="bg-[{data.first_color_palette}] p-20"  style="color: {data.primary_text_palette}">
					<div class="col-span-1 p-30">
						<div class="bg-[#3d3d3d] px-10 py-10">
							<span class="text-2xl font-bold">TEAM</span><br />
							<span class="">{data.team}</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<Championship
		images={data.championship}
		first_color_palette={data.first_color_palette}
		second_color_palette={data.second_color_palette}
	/>

	<!-- ULTIMA GARA -->
	{#if data.races != null}
		<Rounds 			
				username={data.username}
				display={true}
				races={data.races}
				first_color_palette={data.first_color_palette}
				second_color_palette={data.second_color_palette}
				primary_text_palette={data.primary_text_palette}
				second_text_palette={data.second_text_palette}
		/>
	{/if}
	<!-- SPONSOR -->
	<Sponsor
		images={data.sponsor}
		first_color_palette={data.first_color_palette}
		second_color_palette={data.second_color_palette}
		primary_text_palette={data.primary_text_palette}
		second_text_palette={data.second_text_palette}
	/>

	<!-- CONTACT -->
	<Contact
		list={data.contacts}
		first_color_palette={data.first_color_palette}
		second_color_palette={data.second_color_palette}
		primary_text_palette={data.primary_text_palette}
		second_text_palette={data.second_text_palette}
	/>

	<!-- FOOTER-->
	<Footer
		first_color_palette={data.first_color_palette}
		second_color_palette={data.second_color_palette}
		primary_text_palette={data.primary_text_palette}
		second_text_palette={data.second_text_palette}
	/>
</main>

<style>
	.jtp {
		overflow: hidden;
		text-shadow: 6px 0 #fff, -6px 0 #fff, 0 6px #fff, 0 -6px #fff, 6px 6px #fff, -6px -6px #fff,
			6px -6px #fff, -6px 6px #fff;
		color: #171817;
		font-size: 300px;
		padding: 0;
		z-index: 1;
		bottom: -20px;
		opacity: 0.2;
	}

	.mobile-jtp {
		overflow: hidden;
		text-shadow: 6px 0 #fff, -6px 0 #fff, 0 6px #fff, 0 -6px #fff, 6px 6px #fff, -6px -6px #fff,
			6px -6px #fff, -6px 6px #fff;
		color: #171817;
		font-size: 175px;
		padding: 0;
		z-index: 1;

		opacity: 0.2;
	}

	/* Your tablet-specific styles go here */
	.image_tablet {
		width: 1000px; /* Adjust the width and height of the container as needed */
		height: 500px;
		/*background-image: url('https://vwqxtevxdwkkixmqascz.supabase.co/storage/v1/object/public/avatars/ca2ff5b3-b1e4-4a43-ad68-5860a7714cc2/52600bd0-98bf-4978-aae6-7f5b4c930e65_mobile.webp');*/
		background-size: cover;
		background-position: center;
	}

	.lg-container {
		display: none !important;
	}


</style>
