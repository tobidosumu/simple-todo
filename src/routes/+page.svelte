<script lang="ts">
	import type { FilterTodoTypes, TodoTypeSet } from '../todo';
	import AddTodoForm from '../components/AddTodoForm.svelte';
	import Tabs from '../shared/tabs.svelte';
	import Todos from '../components/Todos.svelte';
	import { identity } from 'svelte/internal';

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

	// add new todo
	const addNewTodo = (e: any) => {
		const newTodo = e.detail;
		todos = [newTodo, ...todos];
	};

	const eachTodo = (todo: TodoTypeSet): void => {
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
	let activeTodos: number;

	// reactive values
	$: countAllTodos = todos.length;
	$: activeTodos = todos.filter((todo) => !todo.isCompleted).length;
	$: completedTodos = todos.filter((todo) => todo.isCompleted).length;

	// Filter out completed todos
	$: filteredTodos =
		activeTab === 'Completed'
			? todos.filter((todo) => todo.isCompleted)
			: activeTab === 'Active'
			? todos.filter((todo) => !todo.isCompleted)
			: todos;

	const tabChange = (e: any) => {
		activeTab = e.detail;
	};

	// delete todo
	let handleDeleteTodo = (id: string): void => {
		todos = todos.filter((todo) => todo.id !== id)
	}
</script>

<div class="w-full flex flex-col items-center mt-10">
	<AddTodoForm on:addNewTodo={addNewTodo} />
	<div class="w-[95%] md:w-[70%] lg:w-[50%] mt-1">
		<div class="my-3 sticky top-0 z-50">
			<Tabs on:tabChange={tabChange} {activeTab} {tabs} {countAllTodos} {activeTodos} {completedTodos} />
			{#if activeTab === 'All'}
				<Todos {todos} {eachTodo} handleDeleteTodo={handleDeleteTodo} />
			{:else if activeTab === 'Active'}
				<Todos todos={filteredTodos} {eachTodo} handleDeleteTodo={handleDeleteTodo} />
			{:else if activeTab === 'Completed'}
				<Todos todos={filteredTodos} {eachTodo} handleDeleteTodo={handleDeleteTodo} />
			{/if}
		</div>
	</div>
</div>
