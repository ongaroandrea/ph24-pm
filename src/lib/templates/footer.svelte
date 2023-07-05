<script>
	import logo from '$lib/images/ph-bianco.png';
	export let first_color_palette, second_color_palette;
	import { _ } from 'svelte-i18n';
</script>
<!-- FOOTER -->
<footer>
	<div class="" style="background-color: {first_color_palette}">
		<div class="max-w-2xl mx-auto text-white py-10">
			<div class="text-center">
				<a href="https://www.ph24.it/"  target="_blank"><img src={logo} class="mx-auto w-24 md:w-24 pb-10" alt="logo azienda"></a>
				<p class="px-6" style="color: {second_color_palette}">
					{$_('footer_text')}
					
				</p>
			</div>
			<div
				class="mt-14 md:mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm" style="color: {second_color_palette}">
				<a href="https://www.paoluccimarketing.com/"  target="_blank"><p class="order-2 md:order-1 mt-8 md:mt-0">&copy; Paolucci Marketing, 2023.</p></a>
				<div class="order-1 md:order-2">
					<a href="https://www.ph24.it/"  target="_blank"><span class="px-2">About us</span></a>
					<a href="https://www.ph24.it/contact-us"  target="_blank"><span class="px-2 border-l">Contact us</span></a>
					<a href="https://www.ph24.it/privacy-policy" target="_blank"><span class="px-2 border-l">Privacy Policy</span></a>
				</div>
			</div>
		</div>
	</div>
</footer>
