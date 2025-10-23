import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  AppBar, Toolbar, Typography, Container, Box,
  Button, Stack
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { useUser } from '../UserContext';
import PropTypes from 'prop-types';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useNavigate } from 'react-router-dom';

export const TaskDisplay = ({ tasks }) => {
    const  {user}  = useUser();
    const navigate = useNavigate();
    return(<>
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={1}>
            <NoteAltIcon fontSize="medium" />
            <Typography variant="h6" component="div">
                To Do List
            </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {Meteor.logout();navigate('/login');}}
          >
            {user.username}
          </Button>
        )}
      </Toolbar>
    </AppBar>

    <Container maxWidth="sm" sx={{ py: 3 }}>
        <Stack alignItems="stretch">
          <TaskForm />
          <TaskList tasks={tasks} />
        </Stack>
    </Container>
  </Box>
  </>);
};

TaskDisplay.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};