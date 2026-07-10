import * as todoRepository from "../repositories/todo.repository";

export async function findAll() {
	return todoRepository.findAll();
}

export async function create(title: string) {
	return todoRepository.create(title);
}

export async function deleteById(id: number) {
	return todoRepository.deleteById(id);
}
