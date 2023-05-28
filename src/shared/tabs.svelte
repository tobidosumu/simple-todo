<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let dispatcher = createEventDispatcher();

	export let tabs: string[];
	export let activeTab: string;
	export let countAllTodos: number;
	export let activeTodos: number;
	export let completedTodos: number;

	let activeCircleBadge: boolean = false;

</script>

<div class="">
	<ul class="w-full flex justify-between text-sm text-gray-500 p-2">
		{#each tabs as tab}
			<li on:click={() => dispatcher('tabChange', tab)} on:keydown>
				<button class:activeTab={tab === activeTab} class="todoFilter">
					<span>{tab}</span>
					{#if tab === 'All'}
						<span class:activeCircleBadge={tab === activeTab} class="circleBadge">{countAllTodos}</span>
					{:else if tab === 'Active'}
						<span class:activeCircleBadge={tab === activeTab} class="circleBadge">{activeTodos}</span>
					{:else if tab === 'Completed'}
						<span class:activeCircleBadge={tab === activeTab} class="circleBadge">{completedTodos}</span>
					{/if}
				</button>
			</li>
		{/each}
	</ul>
</div>
