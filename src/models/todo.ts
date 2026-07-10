export interface TodoListItem {
	id: number;
	title: string;
	completed: boolean;
}

export interface Todo extends TodoListItem {
	description: string;
}
