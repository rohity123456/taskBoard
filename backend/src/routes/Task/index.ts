import { Router } from 'express';
import taskController from '@/controllers/Task';
const taskRouter = Router();

taskRouter.get('/', taskController.getTasks);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:taskId', taskController.editTask);
taskRouter.delete('/:taskId', taskController.deleteTask);

export default taskRouter;
