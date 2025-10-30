import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';

export const TaskSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = e => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Buscar tarefas por nome"
                value={searchTerm}
                onChange={handleChange}
            />
        </Box>
    );
};

TaskSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
