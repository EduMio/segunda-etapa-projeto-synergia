import React from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/TasksCollection';
import { TaskDetails } from '../components/tasks/TaskDetails';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useUser } from '../UserContext';
import { Button, Stack,Box  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ViewTaskDisplay = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  
  
  const { taskId } = useParams();                 
  useSubscribe('tasks');        

  const task = useTracker(() => {
    if (!taskId) return null;
    return TasksCollection.findOne({ _id: taskId });
  }, [taskId]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" >
    
      <Stack alignItems="stretch" sx={{ mt: 3, px: 2 }}>
        <TaskDetails
          task={task}
          onEdit={({ _id }) => {
            if (user._id === task.userId) navigate(`/edit/${_id}`);
          }}
          onDelete={({ _id }) => {
            if (user._id === task.userId) {
              Meteor.callAsync("tasks.delete", { _id });
              navigate('/tasklist');
            }
          }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2, maxWidth: 200, alignSelf: 'center' }}
          onClick={() => navigate('/tasklist')}
        >
        Voltar ao início
        </Button>
      </Stack>
    </Box>
  );
};
