import React from 'react';
import { List,Box } from "@mui/material";
import PropTypes from 'prop-types';
import { Task } from "./Task";
import { Meteor } from "meteor/meteor";

export const TaskList = ({tasks}) => {

    return (
    <>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',  
                alignItems: 'flex-start',   
                mt: 4,                      
            }}>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'column',  
                    alignItems: 'center',     
                    width: '100%',
                    maxWidth: 400,            
                    gap: 1,}}>
                
                    {tasks.map((task) => (
                    <Task
                            key={task._id}
                            task={task}
                            userName={task.userName}
                            onDeleteClick={({ _id }) => Meteor.callAsync("tasks.delete", { _id })}
                            onEditClick={()=>{}}
                        />
                    ))}
                </List>
        </Box>
    </>);
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};