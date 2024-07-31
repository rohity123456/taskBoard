import { Router } from 'express';
import boardController from '@/controllers/Board';
const boardRouter = Router();

boardRouter.get('/', boardController.getBoards);
boardRouter.get('/:boardId', boardController.getBoard);
boardRouter.post('/', boardController.createBoard);
export default boardRouter;
