import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Board = mongoose.model('Board', boardSchema);
export default Board;
