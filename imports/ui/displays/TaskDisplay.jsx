import React from "react";
import { useTracker,useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "../../api/TasksCollection";
import { TaskInterface } from "../components/tasks/TaskInterface";

export const TaskDisplay = () => {

  useSubscribe("tasksWithPrivacy");

  const tasks = useTracker(() => {
    return TasksCollection.find({},{sort:{createdAt:-1}}).fetch()
  });

  return (
    <TaskInterface tasks={tasks}/>
  );
};

