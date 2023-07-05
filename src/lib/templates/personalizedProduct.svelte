<script>
    export let arrayProducts;
    export let second_color_palette;

	import { _ } from 'svelte-i18n';
</script>

<div class="w-full bg-gray-100 text-center pt-10">
	<span class="text-3xl font-bold">{$_('custom_products')}</span>
	<div
		class="container md:mx-auto px-5 pt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 py-8"
	>
		{#each arrayProducts as product}
			<div class="text-center">
				<img
					src={product.image}
					class="h-64 w-64 text-center"
					alt="personalized product"
				/>
				<div class="p-5">
					<a
						href={product.permalink}
						target="_blank"
						class="px-4 py-2 text-white text-sm font-medium rounded-md"
						style="background-color: {second_color_palette}; hover:background-color: {second_color_palette}"
						>{$_('buy')}
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
