import { sendJSONResponse } from 'src/utils/helper';
import { Request, Response } from 'express';
import {
  createStatus,
  deleteStatus,
  getStatuses,
  updateStatus
} from '@/models/Status/service';
class StatusController {
  getStatuses = async (req: Request, res: Response) => {
    try {
      const filters = {
        roomId: req.params.roomId
      };
      const pageNo = parseInt((req.query.pageNo || '1') as string);
      const pageSize = parseInt((req.query.pageSize || '10') as string);

      const [statuses, totalStatuses] = await getStatuses(
        filters,
        pageNo,
        pageSize
      );
      sendJSONResponse(res, {
        statuses,
        totalStatuses,
        pageNo,
        pageSize
      });
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
  createStatus = async (req: Request, res: Response) => {
    try {
      const status = req.body;
      const statusObj = {
        type: status.type,
        name: status.name
      };
      const createdStatus = await createStatus(statusObj);
      sendJSONResponse(res, createdStatus);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };

  editStatus = async (req: Request, res: Response) => {
    try {
      const statusId = req.params.statusId;
      const status = req.body;
      const updatedStatus = await updateStatus(statusId, status);
      sendJSONResponse(res, updatedStatus);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };

  deleteStatus = async (req: Request, res: Response) => {
    try {
      const statusId = req.params.statusId;
      const deletedStatus = await deleteStatus(statusId);
      sendJSONResponse(res, deletedStatus);
    } catch (e: any) {
      sendJSONResponse(res, e, false, 500);
    }
  };
}

export default new StatusController();
