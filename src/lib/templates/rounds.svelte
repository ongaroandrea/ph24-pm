<script>
	export let display;
	export let races;
	export let username, first_color_palette, second_color_palette;
	import { _ } from 'svelte-i18n';
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
		<div class="flex justify-between">
			<span class="capitalize text-left text-2xl font-black">{$_('last_races')}</span>
			{#if display}
				<a href="/{username}/races"
					><span class="text-left text-2xl font-black text-md">{$_('go_to_races')}</span></a
				>
			{/if}
		</div>

		<div
			class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-8"
		>
			{#each races as race}
				<a href={race['url']} class="group">
					<div class="relative w-full rounded-lg" style="background-color: {first_color_palette}">
						<img
							src={race['photo']}
							alt="Link to round"
							class="relative h-[275px] w-full object-fill group-hover:opacity-75"
							style="filter: brightness(50%); position: relative;
                        text-align: center;
                        color: white;"
						/>
						<div
							class="text-white"
							style="position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);"
						>
							<p class="text-3xl font-black text-white">{race['name']}</p>
						</div>
					</div>
					<div class="text-center p-2" style="background-color:{second_color_palette}; color: {first_color_palette} ">
						<span class="capitalize text font-black text-3xl" style="color: {first_color_palette}">{race['name']}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
