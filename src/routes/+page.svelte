<script lang="ts">
	import type { TodoTypeSet } from '../components/todo';
	import AddTodoForm from '../components/AddTodoForm.svelte';

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
</script>

<div class="w-full flex flex-col items-center mt-10">
	<AddTodoForm on:addNewTodo={addNewTodo} />
	<div class="w-[95%] md:w-[70%] lg:w-[50%] mt-9">
		<div class="bg-gray-200 mb-1 px-6 md:px-7 lg:px-8 sticky top-0 z-50">
			<div class="w-full flex justify-between text-sm text-gray-500 p-2">
				<button class="todoFilter space-x-2">
					<span class="">All</span>
					<span class="circleBadge"
						>{todos.length}</span
					>
				</button>
				<button class="todoFilter">Active</button>
				<button class="todoFilter">Completed</button>
			</div>
		</div>
		<ul class="h-[52vh] overflow-y-scroll">
			{#each todos as todo (todo.id)}
				<li class="todoList" class:completedTask={todo.isCompleted}>
					<p class="text-sm font-semibold">{todo.task}</p>
					<div>
						<input
							on:change={() => toggleComplete(todo)}
							checked={todo.isCompleted}
							class="bg-gray-100 border-gray-300 text-green-400 hover:cursor-pointer focus:ring-green-200 w-8 h-8 rounded-full"
							type="checkbox"
						/>
						<label
							aria-label="Check todo"
							class="bg-gray-100 border-gray-300 text-gray-500 focus:ring-gray-200"
							for={`todo-${todo.id}`}
						/>
					</div>
					<!-- <button aria-label="Remove todo" class="remove" /> -->
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
