<script>
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import ThemeSwitch from '$lib/components/Molecules/ThemeSwitch.svelte';
	$: isAuth = !!$page.data.user;
</script>

<header class="sticky top-0 z-20">
	<div class="navbar bg-base-200 drop-shadow-lg mb-4 justify-around">
		<div>
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost md:hidden">
					<Icon icon="ph:list-bold" width="30" height="30" />
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content  p-2 shadow  bg-base-200 rounded-box w-52"
				>
					<li>
						<a class={$page.url.pathname === '/' ? 'active' : ''} href="/">Home</a>
					</li>
					{#if isAuth}
						<li>
							<a class={$page.url.pathname === '/todo' ? 'active' : ''} href="/todo">Todo</a>
						</li>
					{:else}
						<li>
							<a class={$page.url.pathname === '/login' ? 'active' : ''} href="/login">Login</a>
						</li>
						<li>
							<a class={$page.url.pathname === '/register' ? 'active' : ''} href="/register"
								>Register</a
							>
						</li>
					{/if}
				</ul>
			</div>
			<a
				class="link link-hover normal-case text-xl font-semibold mx-10 hover:no-underline whitespace-nowrap"
				href="/">SvelteKit To Do List</a
			>
		</div>
		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1 text-lg">
				<li>
					<a class={$page.url.pathname === '/' ? 'active' : ''} href="/">Home</a>
				</li>
				{#if isAuth}
					<li>
						<a class={$page.url.pathname === '/todo' ? 'active' : ''} href="/todo">Todo</a>
					</li>
				{:else}
					<li>
						<a class={$page.url.pathname === '/login' ? 'active' : ''} href="/login">Login</a>
					</li>
					<li>
						<a class={$page.url.pathname === '/register' ? 'active' : ''} href="/register"
							>Register</a
						>
					</li>
				{/if}
			</ul>
		</div>
		<div class="navbar-end flex">
			{#if isAuth}
				<form method="POST">
					<button
						class="btn btn-sm btn-outline btn-error mr-3"
						type="submit"
						formaction="/logout"
						role="button"
					>
						<Icon icon="ph:sign-out" width={25} height={25} />
						<span class="ml-2 hidden md:block"> Logout </span>
					</button>
				</form>
			{/if}
			<ThemeSwitch lightTheme="emerald" darkTheme="dark" />
		</div>
	</div>
</header>
