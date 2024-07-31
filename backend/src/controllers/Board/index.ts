import { sendJSONResponse } from 'src/utils/helper';
import { Request, Response } from 'express';
import { createBoard, getBoard, getBoards } from '@/models/Board/service';
class BoardController {
  getBoards = async (req: Request, res: Response) => {
    try {
      const filters = {
        roomId: req.params.roomId
      };
      const pageNo = parseInt((req.query.pageNo || '1') as string);
      const pageSize = parseInt((req.query.pageSize || '10') as string);

      const [boards, totalBoards] = await getBoards(filters, pageNo, pageSize);
      sendJSONResponse(res, {
        boards,
        totalBoards,
        pageNo,
        pageSize
      });
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
  createBoard = async (req: Request, res: Response) => {
    try {
      const board = req.body;
      const boardObj = {
        title: board.title
      };
      const createdBoard = await createBoard(boardObj);
      sendJSONResponse(res, createdBoard);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };

  getBoard = async (req: Request, res: Response) => {
    try {
      const boardId = req.params.boardId;
      const board = await getBoard(boardId);
      sendJSONResponse(res, board);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
}

export default new BoardController();
