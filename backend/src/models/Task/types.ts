export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: {
    type: string;
    name: string;
  };
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}
