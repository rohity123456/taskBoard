import { TASK_STATUS_TYPES } from '@/utils/enums';
import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: TASK_STATUS_TYPES },
  name: { type: String, default: 'Todo' }
});

const Status = mongoose.model('Status', statusSchema);
export default Status;
