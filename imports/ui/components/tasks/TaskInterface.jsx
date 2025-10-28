import React, { Fragment } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box,
  Button, Stack
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { useUser } from '../../UserContext';
import PropTypes from 'prop-types';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const TaskInterface = ({ tasks }) => {
    const  {user}  = useUser();
    const navigate = useNavigate();
    return(
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" color="primary" enableColorOnDark>
          <Toolbar>
            <Stack direction="row" alignItems="center" spacing={1}>
                <NoteAltIcon fontSize="medium" />
                <Typography variant="h6" component="div">
                    To Do List
                </Typography>
            </Stack>
            <Box sx={{ flexGrow: 0.1 }} />
            <Button
                color="inherit"
                startIcon={<ArrowBackIcon />}
                onClick={() => {navigate('/home');}}
              >
              Dashboard
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
                color="inherit"
                startIcon={<PersonIcon />}
                onClick={() => {navigate('/user');}}
              >
              {user.username}
            </Button>
          </Toolbar>
        </AppBar>
        
          
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Stack alignItems="stretch">
              <TaskForm />
              <TaskList tasks={tasks} />
            </Stack>
        </Container>
    </Box>
  </>
  );
};

TaskInterface.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};