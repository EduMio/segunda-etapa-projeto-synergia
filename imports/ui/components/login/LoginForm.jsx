import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (err) => {
      if (!err) navigate('/home');
      else alert(err);
    });
  };


  return (
    <Paper
      component="form"
      onSubmit={submit}
      elevation={3}
      sx={{
        p: 3,
        mt: 4,
        maxWidth: 400,
        mx: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" textAlign="center">
        Login
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Nome do usuário"
          variant="outlined"
          size="small"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Senha"
          variant="outlined"
          size="small"
          type="password"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<LoginIcon />}
        sx={{ mt: 2 }}
      >
        Log In
      </Button>
    </Paper>
  );
};
