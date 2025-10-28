import React, { useState } from "react";
import { Meteor } from "meteor/meteor";           
import { TextField, Button, Paper } from '@mui/material';
import { useUser } from '../../UserContext';


export const TaskForm = () => {
  const [text, setText] = useState("");
  const { user } = useUser();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      name: text.trim(),
      description:"",
      state:"Cadastrada",
      userId:user._id,
      userName:user.username,
      createdAt:new Date(),
      isPrivate:false
    });

    setText("");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        mt: 2,
        maxWidth: 400,
        mx: 'auto', 
      }}
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Título da nova tarefa"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
      >
        Adicionar
      </Button>
    </Paper>
  );
};

