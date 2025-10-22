import React from "react";
import {useState,Fragment} from "react";
import { useTracker,useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";
import { Meteor } from "meteor/meteor";

export const App = () => {

  const user = useTracker(()=>Meteor.user());
  const logout = () => Meteor.logout();

  const isLoading = useSubscribe("tasks");

  const [hideCompleted,setHideCompleted] = useState(false);
  const hideCompletedFilter = {isChecked:{$ne:true}};
  const tasks = useTracker(() => {
    if(!user)
      return [];
    return TasksCollection.find(hideCompleted?hideCompletedFilter:{},{sort:{createdAt:-1}}).fetch()
  });

  const pendingTasksCount = useTracker(()=>{
    if(!user)
      return 0;
    TasksCollection.find(hideCompletedFilter).count()

  });
  const pendingTasksTitle = pendingTasksCount?`(${pendingTasksCount})`:'';

  const handleToggleChecked = ({_id,isChecked}) => {
    Meteor.callAsync("tasks.toggleChecked", _id, !!isChecked);
  };

  const handleDelete = ({ _id }) =>
    Meteor.callAsync("tasks.delete", { _id });

  if(isLoading()){
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
            {pendingTasksTitle}
          </div>
        </div>
      </header>
      <div className="main">
        {user ?(
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm />
            <div className="filter">
            <button onClick={() => setHideCompleted(!hideCompleted)}>
              {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
          </div>

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckBoxClick={handleToggleChecked}
                  onDeleteClick={handleDelete}
                />
              ))}
            </ul>
          </Fragment>):(<LoginForm/>)
          }
      </div>
    </div>
  );
};