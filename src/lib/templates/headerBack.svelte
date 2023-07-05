<script>
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	export let sito;
	onMount(() => {
		const btn = document.querySelector('button.mobile-menu-button');
		const menu = document.querySelector('.mobile-menu');
		btn.addEventListener('click', () => {
			menu.classList.toggle('hidden');
		});
	});
</script>

<nav class="bg-white shadow-lg">
	<!-- DESKTOP MENU -->
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between">
			<div class="flex space-x-7">
			</div>
			<!-- Secondary Navbar items -->
			<div class="hidden md:flex items-center space-x-3">
				<a
					href="https://app.ph24.it/backend/"
					class="py-4 px-2 text-gray-500 font-semibold hover:text-[#f9c700] transition duration-300"
					>{$_('gestione_siti')}</a
				>
				<a
					href="https://app.ph24.it/backend/{sito}/comments"
					class="py-4 px-2 text-gray-500 font-semibold hover:text-[#f9c700] transition duration-300"
					>{$_('lista_commenti')}</a
				>
			</div>
			<!-- Mobile menu button -->
			<div class="md:hidden flex items-center">
				<button class="outline-none mobile-menu-button">
					<svg
						class=" w-6 h-6 text-gray-500 hover:text-[#f9c700]"
						x-show="!showMenu"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	<!-- mobile menu -->
	<div class="hidden mobile-menu">
		<ul class="">
			<li class="active">
				<a
					href="https://app.ph24.it/backend/"
					class="block text-sm px-2 py-4 text-[#f9c700] font-semibold">{$_('gestione_siti')}</a
				>
			</li>
			<li>
				<a
					href="https://app.ph24.it/backend/{sito}/comments"
					class="block text-sm px-2 py-4 hover:bg-[#f9c700] transition duration-300"
					>{$_('lista_commenti')}</a
				>
			</li>
		</ul>
	</div>
</nav>
