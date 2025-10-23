import React from "react";
import { useTracker,useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { useUser } from '../ui/UserContext';
import { TaskDisplay } from "./displays/TaskDisplay";

export const App = () => {

  const  {user}  = useUser();

  useSubscribe("tasks");

  const tasks = useTracker(() => {
    if(!user)
      return [];
    return TasksCollection.find({},{sort:{createdAt:-1}}).fetch()
  });

  return (
    <TaskDisplay tasks={tasks}/>
  );
};