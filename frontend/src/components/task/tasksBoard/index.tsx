import Loading from '@/components/ui/loading';
import { TASK_STATUS } from '@/lib/constants';
import { ITask } from '@/lib/types';
import {
  useDeleteTaskMutation,
  useGetTasksQuery
} from '@/store/features/task/api';
import { useParams } from 'next/navigation';
import styles from './index.module.scss';
import { getEditingTask, truncateText } from '@/lib/utils';
import TaskModal from '../taskmodal';
import { useEffect, useState } from 'react';
import { TaskInput } from '../taskmodal/schema';
import { setTasks } from '@/store/features/task/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Trash2 } from 'lucide-react';
import IconButton from '@/components/ui/iconButton';

const TaskBoard = () => {
  const { id: boardId = '' } = useParams();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks) || [];
  const [editingTask, setEditingTask] = useState<TaskInput | null>(null);
  const {
    data: tasksData,
    isFetching,
    isLoading
  } = useGetTasksQuery({ boardId: boardId as string });
  const [deleteTask] = useDeleteTaskMutation();
  useEffect(() => {
    dispatch(setTasks(tasksData?.data.tasks || []));
  }, [tasksData]);
  if (isLoading || isFetching) return <Loading />;
  const handleTaskClick = (task: ITask) => {
    setEditingTask(getEditingTask(task));
    setIsTaskModalOpen(true);
  };
  const handleTaskDelete = (task: ITask) => {
    dispatch(setTasks(tasks.filter((t) => t._id !== task._id)));
    deleteTask(task._id);
  };
  return (
    <div className={styles['task-board']}>
      <div className={styles['column']}>
        <h2>TODO</h2>
        <ul>
          {tasks
            .filter((task) => task.status.name === TASK_STATUS.TODO)
            .map((task) => (
              <TaskCard
                onTaskClick={() => handleTaskClick(task)}
                onTaskDelete={() => handleTaskDelete(task)}
                key={task._id}
                task={task}
              />
            ))}
        </ul>
      </div>
      <div className={styles['column']}>
        <h2>DOING</h2>
        <ul>
          {tasks
            .filter((task) => task.status.name === TASK_STATUS.IN_PROGRESS)
            .map((task) => (
              <TaskCard
                onTaskClick={() => handleTaskClick(task)}
                onTaskDelete={() => handleTaskDelete(task)}
                key={task._id}
                task={task}
              />
            ))}
        </ul>
      </div>
      <div className={styles['column']}>
        <h2>DONE</h2>
        <ul>
          {tasks
            .filter((task) => task.status.name === TASK_STATUS.DONE)
            .map((task) => (
              <TaskCard
                onTaskClick={() => handleTaskClick(task)}
                onTaskDelete={() => handleTaskDelete(task)}
                key={task._id}
                task={task}
              />
            ))}
        </ul>
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        boardId={boardId as string}
        editingTask={editingTask}
        setEditingTask={(task) => setEditingTask(task)}
        isEditing
      />
    </div>
  );
};

export default TaskBoard;

const TaskCard: React.FC<{
  task: ITask;
  onTaskClick: () => void;
  onTaskDelete: () => void;
}> = ({ task, onTaskClick, onTaskDelete }) => {
  return (
    <div className={styles['task-card']} onClick={onTaskClick}>
      <h5>{task.title}</h5>
      <p>{truncateText(task.description, 100)}</p>
      <IconButton
        className={styles['delete-button']}
        icon={<Trash2 />}
        onClick={(e) => {
          e.stopPropagation();
          onTaskDelete();
        }}
      />
    </div>
  );
};
