import express, { Request, Response, NextFunction } from 'express';
import boardRouter from './Board';
import taskRouter from './Task';
import statusRouter from './Status';

const apiRouter = express.Router();

apiRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Server is running');
});

// Board routes
apiRouter.use('/boards', boardRouter);
// Task routes
apiRouter.use('/tasks', taskRouter);
// Status routes
apiRouter.use('/statuses', statusRouter);

export default apiRouter;
