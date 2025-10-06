'use client';

import { useParams } from "next/navigation";
import TaskScreen from "../../components/task/task";

const Task = () => {
  const params = useParams();
  let id = params?.id;

  if (Array.isArray(id)) {
    id = id[0];
  }

  return (
    <>
      {id && <TaskScreen id={id} />}
    </>
  );
};

export default Task;
