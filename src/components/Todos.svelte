<script lang="ts">
	import type { TodoTypeSet } from "../todo";

    export let todos: TodoTypeSet[];
	export let eachTodo: any;
</script>

<div>
	<ul class="h-[52vh] overflow-y-scroll">
		{#each todos as todo (todo.id)}
			<li class="todoList" class:completedTask={todo.isCompleted}>
				<p class="text-sm font-semibold">{todo.task}</p>
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
			</li>
		{/each}
	</ul>
</div>
