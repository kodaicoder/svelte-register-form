import { prisma } from '../prisma';

export const loadTodo = async () => {
	return await prisma.todo.findMany({
		where: { isDone: false }
	});
};
