import React, { Fragment } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box,
  Button, Stack, Grid, Pagination
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { TaskSearch } from './TaskSearch';
import { useUser } from '../../UserContext';
import PropTypes from 'prop-types';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';

export const TaskInterface = ({ tasks, toggleFilter, showCompleted, onSearch, currentPage, totalPages, onPageChange }) => {
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {navigate('/home');}}
                >
                  Dashboard
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FilterListIcon />}
                  onClick={toggleFilter}
                >
                  {showCompleted ? 'Ocultar Concluídas' : 'Mostrar Concluídas'}
                </Button>
                <TaskSearch onSearch={onSearch} />
              </Box>
              <Stack>
                <TaskForm />
                <TaskList tasks={tasks} />
              </Stack>
              {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage + 1}
                      onChange={(event, page) => onPageChange(page - 1)}
                      color="primary"
                    />
                  </Box>
                )}
            </Grid>
          </Grid>
        </Container>
    </Box>
  </>
  );
};

TaskInterface.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFilter: PropTypes.func,
  showCompleted: PropTypes.bool,
  onSearch: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func
};