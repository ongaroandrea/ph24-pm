<script>
	export let list;
	export let first_color_palette, second_color_palette;
	import { _ } from 'svelte-i18n';
</script>

{#if list != undefined && list.length != 0}
	<div id="contact" class="py-8">
		<div class="container mx-auto my-16 md:my-32">
			<!-- top -->
			<div class="lg:hidden text-center mb-10 px-10 md:px-0">
				<p class="font-bold text-6xl">{$_('get_touch')}</p>
				<span class="text-xl">{$_('get_touch_description')}</span>
			</div>

			<div class="grid grid-flow-col gap-3">
				<div class="hidden lg:block text-left mb-10 px-5">
					<p class="font-bold text-4xl">{$_('get_touch')}</p>
					<span class="text-xl">{$_('get_touch_description')}</span>
				</div>
				<div class="col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 px-10">
					{#each list as contact}
						<div class="">
							<div class="line-clamp-4">
								<div class="px-6 md:px-20 py-10 md:py-10 text-left bg-[#f8fafb]">
									<!--<i class="fa fa-phone" /><br />-->
									<p class="font-bold pb-1 text-2xl">{contact.name}</p>
									<p>{contact.email}</p>
									<p>{contact.telephone}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
