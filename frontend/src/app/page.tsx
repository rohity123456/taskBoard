'use client';

import Loading from '@/components/ui/loading';
import { useGetBoardsQuery } from '@/store/features/board/api';
import { setActiveBoard } from '@/store/features/board/slice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: boards } = useGetBoardsQuery({ page: '1', pageSize: '10' });
  useEffect(() => {
    if (boards && boards.data.boards.length > 0) {
      const firstBoardId = boards.data.boards[0]._id;
      dispatch(setActiveBoard(firstBoardId));
      router.push(`/board/${firstBoardId}`);
    }
  }, [boards, dispatch, router]);

  return (
    <div>
      <Loading message='Loading...' />
    </div>
  );
};

export default HomePage;
