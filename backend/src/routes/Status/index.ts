import { Router } from 'express';
import statusController from '@/controllers/Status';
const statusRouter = Router();

statusRouter.get('/', statusController.getStatuses);
statusRouter.post('/', statusController.createStatus);
statusRouter.put('/:statusId', statusController.editStatus);
statusRouter.delete('/:statusId', statusController.deleteStatus);

export default statusRouter;
