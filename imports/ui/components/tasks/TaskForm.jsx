import React, { useState } from "react";
import { Meteor } from "meteor/meteor";           
import { TextField, Button, Paper } from '@mui/material';

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      text: text.trim(),
      createdAt: new Date(),
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
        mx: 'auto', // centers horizontally
      }}
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
      >
        Add
      </Button>
    </Paper>
  );
};

