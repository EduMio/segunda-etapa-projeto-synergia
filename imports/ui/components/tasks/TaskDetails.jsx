// ui/components/tasks/TaskDetails.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
  Typography, Stack, Chip, Divider, Avatar,
  IconButton, Tooltip, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const TaskDetails = ({ task, onEdit, onDelete }) => {
  const {
    name,
    description,
    state,           
    userName,
    createdAt,
    isPrivate
  } = task;

  const createdAtStr = createdAt
    ? new Date(createdAt).toLocaleString('pt-BR')
    : '—';

  const stateLabel = state ?? 'Cadastrada';
  const isPrivateLabel = isPrivate ? 'Privado' : 'Pública';

  const stateColor =
    state === 'Concluída' ? 'success' :
    state === 'Em Andamento' ? 'info' :
    state === 'Cadastrada' ? 'default' : 'default';
  
  const isPrivateColor =
    isPrivate ? 'primary' : 'success' ;

  const handleDelete = () => { onDelete(task); };
  const handleEdit = () => { onEdit(task); };

  return (
    <Card
      sx={{
        maxWidth: 520,
        mx: 'auto',
        mt: 3,
        borderRadius: 2,
      }}
    >
      <CardHeader
        avatar={<Avatar>{(userName || '?').slice(0, 1).toUpperCase()}</Avatar>}
        title={
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
        }
        subheader={
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography variant="body2" color="text.secondary">
              {userName || 'Unknown user'}
            </Typography>
            <Box component="span" sx={{ color: 'text.disabled' }}>•</Box>
            <Typography variant="body2" color="text.secondary">
              {createdAtStr}
            </Typography>
          </Stack>
        }
        action={
          (onEdit || onDelete) && (
            <Stack direction="row" spacing={0.5}>
              {onEdit && (
                <Tooltip title="Editar">
                  <IconButton size="small" onClick={handleEdit}><EditIcon /></IconButton>
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Deletar">
                  <IconButton size="small" onClick={handleDelete}><DeleteIcon /></IconButton>
                </Tooltip>
              )}
            </Stack>
          )
        }
      />

      <Divider />

      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={stateLabel}
              color={stateColor}
              size="small"
              variant={state ? 'filled' : 'outlined'}
            />
            <Chip
              label={isPrivateLabel}
              color={isPrivateColor}
              size="small"
              variant={state ? 'filled' : 'outlined'}
            />
          </Stack>

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {description && description.trim() ? description : 'Sem descrição'}
          </Typography>
        </Stack>
      </CardContent>

    </Card>
  );
};

TaskDetails.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    state: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    userId: PropTypes.string,
    userName: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    isPrivate: PropTypes.bool
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
