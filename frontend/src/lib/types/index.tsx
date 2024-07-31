export interface IBoard {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: IStatus;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStatus {
  _id: string;
  type: string;
  name: string;
}
