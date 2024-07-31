import { sendJSONResponse } from 'src/utils/helper';
import { Request, Response } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from '@/models/Task/service';
class TaskController {
  getTasks = async (req: Request, res: Response) => {
    try {
      const filters = {
        roomId: req.params.roomId
      };
      const pageNo = parseInt((req.query.pageNo || '1') as string);
      const pageSize = parseInt((req.query.pageSize || '10') as string);

      const [tasks, totalTasks] = await getTasks(filters, pageNo, pageSize);
      sendJSONResponse(res, {
        tasks,
        totalTasks,
        pageNo,
        pageSize
      });
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
  createTask = async (req: Request, res: Response) => {
    try {
      const task = req.body;
      const taskObj = {
        title: task.title,
        description: task.description,
        status: task.status,
        boardId: task.boardId
      };
      const createdTask = await createTask(taskObj);
      sendJSONResponse(res, createdTask);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };

  editTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
      const task = req.body;
      const updatedTask = await updateTask(taskId, task);
      sendJSONResponse(res, updatedTask);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await deleteTask(taskId);
      sendJSONResponse(res, deletedTask);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
}

export default new TaskController();
