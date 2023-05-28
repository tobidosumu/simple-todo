<script lang="ts">
	import DeleteIcon from '../icons/DeleteIcon.svelte';
	import type { TodoTypeSet } from '../todo';

	export let todos: TodoTypeSet[];
	export let eachTodo: any;
    export let handleDeleteTodo: any;
</script>

<div>
	<ul class="h-[52vh] overflow-y-scroll">
		{#each todos as todo (todo.id)}
			<li class="todoList" class:completedTask={todo.isCompleted}>
				<p class="text-sm font-semibold">{todo.task}</p>
				<div class="group flex items-center space-x-4">
                    <div on:click={() => handleDeleteTodo(todo.id)} on:keydown class="p-1.5 bg-slate-100 rounded-full hover:bg-red-400 text-gray-600 hover:text-white hover:cursor-pointer">
                        <DeleteIcon />
                    </div>
					<div>
						<input
							on:change={() => eachTodo(todo)}
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
				</div>
			</li>
		{/each}
	</ul>
</div>
