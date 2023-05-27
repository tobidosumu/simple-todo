<script lang="ts">
	import type { TodoTypeSet } from '../components/todo';
	import AddTodoForm from '../components/AddTodoForm.svelte';
	import Tabs from '../shared/tabs.svelte';
	import AllTodos from '../components/AllTodos.svelte';
	import ActiveTodos from '../components/ActiveTodos.svelte';
	import CompletedTodos from '../components/CompletedTodos.svelte';

	let todos: TodoTypeSet[] = [
		{
			id: '1',
			task: 'Dispose off the bin',
			isCompleted: true
		},
		{
			id: '2',
			task: 'Visit the dentist',
			isCompleted: false
		},
		{
			id: '3',
			task: 'Meeting with the developers',
			isCompleted: false
		},
		{
			id: '4',
			task: 'Work out',
			isCompleted: true
		}
	];

	const addNewTodo = (e: any) => {
		const newTodo = e.detail;
		todos = [newTodo, ...todos];
	};

	const toggleComplete = (todo: TodoTypeSet): void => {
		todos = todos.map((item) => {
			if (item.id === todo.id) {
				return {
					...item,
					isCompleted: !item.isCompleted
				};
			}
			return item;
		});
	};

	// tabs
	let tabs: string[] = ['All', 'Active', 'Completed'];
	let activeTab: string = 'All';

	// count total number of todos
	let countAllTodos: number;
	$: countAllTodos = todos.length;

	const tabChange = (e: any) => {
		activeTab = e.detail;
	};
</script>

<div class="w-full flex flex-col items-center mt-10">
	<AddTodoForm on:addNewTodo={addNewTodo} />
	<div class="w-[95%] md:w-[70%] lg:w-[50%] mt-1">
		<div class="my-3 sticky top-0 z-50">
			<Tabs on:tabChange={tabChange} {activeTab} {tabs} {countAllTodos} />
			{#if activeTab === 'All'}
				<AllTodos {todos} {toggleComplete} />
			{:else if activeTab === 'Active'}
				<ActiveTodos />
			{:else if activeTab === 'Completed'}
				<CompletedTodos />
			{/if}
		</div>
	</div>
</div>