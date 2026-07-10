import type { Todo, TodoListItem } from "../models/todo";

export function toTodoListResponse(todo: TodoListItem[]) {
	return todo.map((value) => {
		return {
			id: value.id,
			title: value.title,
			completed: value.completed,
		};
	});
}

export function toTodoDetailResponse(todo: Todo) {
	return {
		id: todo.id,
		title: todo.title,
		description: todo.description,
		completed: todo.completed,
	};
}
