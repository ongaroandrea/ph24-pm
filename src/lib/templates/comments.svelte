<script>
	import { browser } from '$app/environment';
	export let comments;
	export let first_color_palette, second_color_palette, third_color_palette;
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Carousel from 'svelte-carousel';
	let carousel;
	onMount(async () => {
		if (browser) {
			const elem = document.getElementsByClassName('next-button');
			for (var i = 0; i < elem.length; i++) {
				elem[i].addEventListener('click', () => {
					carousel.goToNext();
				});
			}

			const prev = document.getElementsByClassName('prev-button');
			for (var i = 0; i < prev.length; i++) {
				prev[i].addEventListener('click', () => {
					carousel.goToNext();
				});
			}
		}
	});
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></script>
</svelte:head>

<!-- TESTIMONIAL https://www.hyperui.dev/components/marketing/testimonials-->
{#if comments != undefined && comments.length != 0}
	<section class="content-center" style="background-color: {third_color_palette}">
		<div class="px-4 py-16 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8">
			<div class="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
				<div class="text-center" style="color: {first_color_palette}">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
						{$_('comment_title')}
					</h2>

					<p class="mt-4" style="color: {first_color_palette}">
						{$_('comment_text')}
					</p>

					<div class="hidden lg:mt-8 lg:flex lg:gap-4">
						<button
							class="prev-button rounded-full border border-[{second_color_palette}] p-3 text-[{second_color_palette}] hover:bg-[{second_color_palette}] hover:text-white"
						>
							<span class="sr-only">Previous Slide</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-5 w-5 rtl:rotate-180"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</button>

						<button
							class="next-button rounded-full border border-[{second_color_palette}] p-3 text-[{second_color_palette}] hover:bg-[{second_color_palette}] hover:text-white"
						>
							<span class="sr-only">Next Slide</span>
							<svg
								class="h-5 w-5 rtl:rotate-180"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9 5l7 7-7 7"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div class="-mx-6 lg:col-span-2 lg:mx-0">
					<div class="!overflow-hidden">
						{#if browser}
							<Carousel autoplay autoplayDuration={20000} particlesToShow={1} bind:this={carousel} arrows={false}>
								{#each comments as comment}
									<blockquote class="flex h-full flex-col justify-between bg-white p-12">
										<div>
											<div class="mt-4">
												<!--<p class="text-2xl font-bold text-[#f9c700] sm:text-3xl">{comment.title}</p>-->

												<p class="mt-4 leading-relaxed text-{first_color_palette}">
													{comment.text}
												</p>
											</div>
										</div>

										<footer class="mt-8 text-sm text-{first_color_palette}">
											&mdash; {comment.name_person} | {comment.position_person}
										</footer>
									</blockquote>
								{/each}
							</Carousel>
						{/if}
					</div>
				</div>
			</div>

			<!--Comandi-->
			<div class="mt-8 flex justify-center gap-4 lg:hidden">
				<button
					aria-label="Previous slide"
					class="prev-button rounded-full border border-[{second_color_palette}] p-4 text-[{second_color_palette}] hover:bg-[{second_color_palette}] hover:text-white"
				>
					<svg
						class="h-5 w-5 -rotate-180 transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9 5l7 7-7 7"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						/>
					</svg>
				</button>

				<button
					aria-label="Next slide"
					class="next-button rounded-full border border-[{second_color_palette}] p-4 text-[{second_color_palette}] hover:bg-[{second_color_palette}] hover:text-white"
				>
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9 5l7 7-7 7"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						/>
					</svg>
				</button>
			</div>
		</div>
	</section>
{/if}
