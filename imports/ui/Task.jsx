import React from 'react';
import PropTypes from 'prop-types';

export const Task = ({task,onCheckBoxClick,onDeleteClick}) => {
    return(<li>
        <input type='checkbox'
        checked={!!task.isChecked}
        onClick={()=>onCheckBoxClick(task)}
        />
        
        <span>{task.text}</span>
        <button onClick={()=>onDeleteClick(task)}>&times;</button>
        
        </li>);
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    isChecked: PropTypes.bool,
  }).isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};