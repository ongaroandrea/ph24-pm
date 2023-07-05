<script>
	import { superForm } from 'sveltekit-superforms/client';
	/** @type {import('./$types').ActionData} */
	export let data;
	import logo from '$lib/images/logo.png';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	const { form, errors, constraints, enhance, message } = superForm(data.form);
	let show_password = false;
	onMount(() => {
		const showPasswordCheckbox = document.getElementById('checkbox');
		const passwordInput = document.getElementById('password');

		showPasswordCheckbox.addEventListener('change', function () {
			if (showPasswordCheckbox.checked) {
				passwordInput.type = 'text';
			} else {
				passwordInput.type = 'password';
			}
		});
	});
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img class="mx-auto h-24 w-auto" src={logo} alt="PH 24" />
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			{$_('sign_account')}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" action="?/password" method="POST" use:enhance>
			{#if $message}
				<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
					{$message}
				</div>
			{/if}
			<div>
				<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
					>{$_('Email')}</label
				>
				<div class="mt-2">
					<input
						type="email"
						name="email"
						id="email"
						data-invalid={$errors.email}
						bind:value={$form.email}
						{...$constraints.email}
						class="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
				{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
						>Password</label
					>
					<div class="text-sm">
						<a href="forgot-password" class="font-semibold text-indigo-600 hover:text-indigo-500"
							>{$_('password_forgot')}?</a
						>
					</div>
				</div>
				<div class="mt-2">
					<input
						type="password"
						name="password"
						id="password"
						data-invalid={$errors.password}
						bind:value={$form.password}
						{...$constraints.email}
						class="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
				<div>
					<input
						type="checkbox"
						id="checkbox"
						bind:checked={show_password}
						on:click={() => (show_password = !show_password)}
					/>
					<span class="capitalize">{$_('password_show')}</span>
				</div>
				{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>{$_('sign_in')}</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			{$_('not_member')}?
			<a
				href="https://www.ph24.it/it/"
				class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>{$_('buy_page')}
			</a>
		</p>
	</div>
</div>

<!-- https://tailwindui.com/components/application-ui/forms/sign-in-forms-->

<style>
	.invalid {
		color: red;
	}
</style>
