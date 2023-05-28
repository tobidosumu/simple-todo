<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    import DeleteIcon from '../icons/DeleteIcon.svelte';
    import EditIcon from '../icons/EditIcon.svelte';
    import type { TodoTypeSet } from '../todo';
  
    export let todos: TodoTypeSet[];
    export let eachTodo: any;
    export let handleDeleteTodo: any;
  
    // edit todo
    const dispatch = createEventDispatcher();
  
    let editingTodoId: string | null = null;
    let editedTodoTask: string = '';
  
    const startEditing = (id: string, task: string) => {
      editingTodoId = id;
      editedTodoTask = task;
    };
  
    const cancelEditing = () => {
      editingTodoId = null;
      editedTodoTask = '';
    };
  
    const saveEditedTodo = () => {
      if (editingTodoId && editedTodoTask.trim() !== '') {
        const updatedTodo = todos.find((todo) => todo.id === editingTodoId);
        if (updatedTodo) {
          updatedTodo.task = editedTodoTask.trim();
          dispatch('updateTodo', updatedTodo);
        }
      }
      cancelEditing();
    };
  </script>
  
  <div>
    <ul class="h-[52vh] overflow-y-scroll">
      {#each todos as todo (todo.id)}
        <li class="todoList" class:completedTask={todo.isCompleted}>
          {#if editingTodoId === todo.id}
            <input
              type="text"
              bind:value={editedTodoTask}
              class="w-full px-2 py-1 bg-gray-100 border-gray-300 rounded-md"
            />
            <button on:click={saveEditedTodo} class="px-2 py-1 ml-2 bg-green-400 text-white rounded-md">Save</button>
            <button on:click={cancelEditing} class="px-2 py-1 ml-2 bg-red-400 text-white rounded-md">Cancel</button>
          {:else}
            <p class="text-sm font-semibold">{todo.task}</p>
            <div class="group flex items-center space-x-4">
              <div
                on:click={() => handleDeleteTodo(todo.id)}
                on:keydown
                class="p-1.5 rounded-full hover:bg-red-400 text-gray-600 hover:text-white hover:cursor-pointer bg-red-100"
              >
                <DeleteIcon />
              </div>
              <div
                on:click={() => startEditing(todo.id, todo.task)}
                on:keydown
                class="p-1.5 rounded-full hover:bg-green-400 text-gray-600 hover:text-white hover:cursor-pointer bg-green-100"
              >
                <EditIcon />
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
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  