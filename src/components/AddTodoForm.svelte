<script lang="ts">
	import type { TodoTypeSet } from '../todo';
	import { createEventDispatcher } from 'svelte';

	let dispatcher = createEventDispatcher();
	let task: string = '';
	let isCompleted: boolean;

	const generateRandomId = (): string => Math.random().toString(16).slice(2);

	const handleSubmit = (): void => {
		// task validation
		if (task.trim().length === 0) {
			alert('Todo task cannot be empty.');
			return;
		}

		if (task.trim().length < 5) {
			alert('Todo task cannot be less than 5 characters long.');
			task = '';
			return;
		}

		if (task.trim().length > 20) {
			alert('Todo task cannot be more than 20 characters long.');
			task = '';
			return;
		}

		let todo: TodoTypeSet = {
			id: generateRandomId(),
			task,
			isCompleted
		};

		dispatcher('addNewTodo', todo);
		task = '';
	};
</script>

<main class="w-[95%] md:w-[70%] lg:w-[50%]">
	<form on:submit={handleSubmit}>
		<div class="sticky top-10 z-50">
			<h1 class="text-center mb-5 text-lg md:text-xl font-semibold text-gray-700">Simple Todo</h1>
			<div class="border shadow rounded">
				<div class="p-6 md:p-10 lg:p-10">
					<input
						bind:value={task}
						id="new-todo"
						class="w-full ring ring-gray-400/[0.7] focus:ring focus:ring-gray-500 border-none focus:border-none"
						placeholder="What's the next task?"
						type="text"
					/>
				</div>
			</div>
		</div>
	</form>
</main>
