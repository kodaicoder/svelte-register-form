<script>
	export let checked;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const change = (ev) => {
		dispatch('change', {
			nodeEvent: ev
		});
	};
</script>

<label class="text-[17px] relative inline-block w-[4em] h-[1.8em]">
	<input class="opacity-0 w-0 h-0" type="checkbox" bind:checked on:change={change} />
	<span class="slider" />
</label>

<style>
	/* The slider */
	.slider {
		--background: hsl(var(--b1));
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--background);
		-webkit-transition: 0.5s;
		transition: 0.5s;
		border-radius: 30px;
		border: 1px solid hsl(var(--bc));
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 1.4em;
		width: 1.4em;
		border-radius: 50%;
		left: 5%;
		bottom: 10%;
		/* -webkit-box-shadow: inset 6px -4px 0px 0px #fff000;
		box-shadow: inset 6px -4px 0px 0px #fff000;
		background: var(--background); */
		background-color: hsl(var(--wa));
		-webkit-mask-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="256" height="256" viewBox="0 0 256 256"%3E%3Ccircle cx="128" cy="128" r="60" fill="currentColor" opacity=".2"%2F%3E%3Cpath fill="currentColor" d="M128 60a68 68 0 1 0 68 68a68.1 68.1 0 0 0-68-68Zm0 120a52 52 0 1 1 52-52a52 52 0 0 1-52 52Zm-8-144v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0ZM51.6 62.9a8 8 0 0 1 11.3-11.3l5.7 5.7a8 8 0 0 1 0 11.3a8.1 8.1 0 0 1-11.3 0ZM44 128a8 8 0 0 1-8 8h-8a8 8 0 0 1 0-16h8a8 8 0 0 1 8 8Zm24.6 59.4a8 8 0 0 1 0 11.3l-5.7 5.7a8 8 0 0 1-5.6 2.3a8.3 8.3 0 0 1-5.7-2.3a8 8 0 0 1 0-11.3l5.7-5.7a8 8 0 0 1 11.3 0ZM136 220v8a8 8 0 0 1-16 0v-8a8 8 0 0 1 16 0Zm68.4-26.9a8 8 0 0 1 0 11.3a8.3 8.3 0 0 1-5.7 2.3a8 8 0 0 1-5.6-2.3l-5.7-5.7a8 8 0 0 1 11.3-11.3ZM236 128a8 8 0 0 1-8 8h-8a8 8 0 0 1 0-16h8a8 8 0 0 1 8 8Zm-48.6-59.4a8 8 0 0 1 0-11.3l5.7-5.7a8 8 0 1 1 11.3 11.3l-5.7 5.7a8.1 8.1 0 0 1-11.3 0Z"%2F%3E%3C%2Fsvg%3E');
		mask-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="256" height="256" viewBox="0 0 256 256"%3E%3Ccircle cx="128" cy="128" r="60" fill="currentColor" opacity=".2"%2F%3E%3Cpath fill="currentColor" d="M128 60a68 68 0 1 0 68 68a68.1 68.1 0 0 0-68-68Zm0 120a52 52 0 1 1 52-52a52 52 0 0 1-52 52Zm-8-144v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0ZM51.6 62.9a8 8 0 0 1 11.3-11.3l5.7 5.7a8 8 0 0 1 0 11.3a8.1 8.1 0 0 1-11.3 0ZM44 128a8 8 0 0 1-8 8h-8a8 8 0 0 1 0-16h8a8 8 0 0 1 8 8Zm24.6 59.4a8 8 0 0 1 0 11.3l-5.7 5.7a8 8 0 0 1-5.6 2.3a8.3 8.3 0 0 1-5.7-2.3a8 8 0 0 1 0-11.3l5.7-5.7a8 8 0 0 1 11.3 0ZM136 220v8a8 8 0 0 1-16 0v-8a8 8 0 0 1 16 0Zm68.4-26.9a8 8 0 0 1 0 11.3a8.3 8.3 0 0 1-5.7 2.3a8 8 0 0 1-5.6-2.3l-5.7-5.7a8 8 0 0 1 11.3-11.3ZM236 128a8 8 0 0 1-8 8h-8a8 8 0 0 1 0-16h8a8 8 0 0 1 8 8Zm-48.6-59.4a8 8 0 0 1 0-11.3l5.7-5.7a8 8 0 1 1 11.3 11.3l-5.7 5.7a8.1 8.1 0 0 1-11.3 0Z"%2F%3E%3C%2Fsvg%3E');
		mask-size: 1.4em;
		mask-repeat: no-repeat;
		mask-position: center;
		-webkit-transition: 0.25s;
		transition: 0.25s;
		/* //animation: spin 0.5s ease-out 0s 1 normal; */
	}

	input:checked + .slider {
		background-color: var(--background);
	}

	input:checked + .slider:before {
		left: 55%;
		/* -webkit-transform: translateX(100%);
		-ms-transform: translateX(100%);
		transform: translateX(100%); */
		background-color: hsl(var(--wa));
		-webkit-mask-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="256" height="256" viewBox="0 0 256 256"%3E%3Cpath fill="currentColor" d="M216.7 152.6A91.9 91.9 0 0 1 103.4 39.3a92 92 0 1 0 113.3 113.3Z" opacity=".2"%2F%3E%3Cpath fill="currentColor" d="M248 88a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0V96h-16a8 8 0 0 1 0-16h16V64a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Zm-96-40h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16Zm72.3 102.1a7.9 7.9 0 0 1 0 4.8A100 100 0 1 1 101.1 31.7a7.8 7.8 0 0 1 5.2.2a8 8 0 0 1 5 7.9a5.7 5.7 0 0 1-.3 1.8A84 84 0 0 0 214.3 145l2.2-.4a8.2 8.2 0 0 1 7.8 5.5Zm-20 13.1A99.9 99.9 0 0 1 92.8 51.7a84 84 0 1 0 111.5 111.5Z"%2F%3E%3C%2Fsvg%3E');
		mask-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="256" height="256" viewBox="0 0 256 256"%3E%3Cpath fill="currentColor" d="M216.7 152.6A91.9 91.9 0 0 1 103.4 39.3a92 92 0 1 0 113.3 113.3Z" opacity=".2"%2F%3E%3Cpath fill="currentColor" d="M248 88a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0V96h-16a8 8 0 0 1 0-16h16V64a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Zm-96-40h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16Zm72.3 102.1a7.9 7.9 0 0 1 0 4.8A100 100 0 1 1 101.1 31.7a7.8 7.8 0 0 1 5.2.2a8 8 0 0 1 5 7.9a5.7 5.7 0 0 1-.3 1.8A84 84 0 0 0 214.3 145l2.2-.4a8.2 8.2 0 0 1 7.8 5.5Zm-20 13.1A99.9 99.9 0 0 1 92.8 51.7a84 84 0 1 0 111.5 111.5Z"%2F%3E%3C%2Fsvg%3E');
		mask-size: 1.4em;
		mask-repeat: no-repeat;
		mask-position: center;
		/* animation: spin 0.5s ease-out 0s 1 normal; */
		/* -webkit-box-shadow: inset 15px 0px 0px 15px #fff000;
		box-shadow: inset 15px -4px 0px 15px #fff000; */
	}
</style>
