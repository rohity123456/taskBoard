import express, { Request, Response, NextFunction } from "express";

const apiRouter = express.Router();

apiRouter.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("Server is running");
});

export default apiRouter;