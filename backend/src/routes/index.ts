import express, { Request, Response, NextFunction } from 'express';
import boardRouter from './Board';

const apiRouter = express.Router();

apiRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Server is running');
});

// Board routes
apiRouter.use('/boards', boardRouter);

export default apiRouter;
