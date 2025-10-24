import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Menu, MenuItem, Paper
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Task = ({ task, onDeleteClick, onEditClick, userName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDelete = () => { handleMenuClose(); onDeleteClick(task); };
  const handleEdit = () => { handleMenuClose(); onEditClick(task); };

  return (
    <Paper
      elevation={1}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1,
        py: 0.5,
        borderRadius: 2,
        mb: 1,
        width: 'auto',         
        maxWidth: '100%',
      }}
    >
      <ListItem
        disablePadding
        sx={{
          width: 'auto',
          minWidth: 250,       
          maxWidth: 400,       
        }}
        secondaryAction={
          <>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </>
        }
      >
        <ListItemButton dense sx={{ pr: 4 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <TaskIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={task.name}
            secondary={userName}
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
