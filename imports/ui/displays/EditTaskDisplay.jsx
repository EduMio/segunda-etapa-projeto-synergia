import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/TasksCollection';
import {
	Paper,
	TextField,
	Button,
	Stack,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
	Switch,
	Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Meteor } from 'meteor/meteor';

export const EditTaskDisplay = () => {
	const { taskId } = useParams();
	const navigate = useNavigate();

	const isLoading = useSubscribe('tasks');
	const task = useTracker(
		() => (taskId ? TasksCollection.findOne({ _id: taskId }) : null),
		[taskId]
	);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [stateVal, setStateVal] = useState('');
	const [isPrivateVal, setIsPrivateVal] = useState(false);

	useEffect(() => {
		if (task) {
			setName(task.name ?? '');
			setDescription(task.description ?? '');
			setStateVal(task.state ?? '');
			setIsPrivateVal(task.isPrivate ?? false);
		}
	}, [task]);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!task || !name.trim()) return;

		await Meteor.callAsync('tasks.update', {
			_id: task._id,
			name: name.trim(),
			description: description.trim(),
			state: stateVal === '' ? null : stateVal,
			isPrivate: isPrivateVal,
		});

		navigate(`/view/${task._id}`);
	};

	if (isLoading()) {
		return (
			<Stack alignItems="center" justifyContent="center" sx={{ mt: 6 }}>
				<CircularProgress />
			</Stack>
		);
	}

	if (!task) {
		return (
			<Stack alignItems="center" sx={{ mt: 6 }}>
				<Typography variant="h6">Tarefa não encontrada</Typography>
				<Button
					startIcon={<ArrowBackIcon />}
					sx={{ mt: 2 }}
					onClick={() => navigate('/tasklist')}
				>
					Voltar
				</Button>
			</Stack>
		);
	}

	const handleChange = event => {
		setIsPrivateVal(event.target.checked);
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="90vh"
		>
			<Paper
				component="form"
				onSubmit={handleSubmit}
				elevation={3}
				sx={{
					p: 3,
					mt: 4,
					maxWidth: 520,
					mx: 'auto',
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Typography variant="h6">Editar Tarefa</Typography>

				<TextField
					label="Nome"
					variant="outlined"
					size="small"
					required
					fullWidth
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				<TextField
					label="Descrição"
					variant="outlined"
					size="small"
					fullWidth
					multiline
					minRows={3}
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				<FormControl size="small" fullWidth>
					<InputLabel id="state-label">State</InputLabel>
					<Select
						labelId="state-label"
						label="State"
						value={stateVal}
						onChange={e => setStateVal(e.target.value)}
					>
						<MenuItem value="Cadastrada">Cadastrada</MenuItem>
						<MenuItem value="Em Andamento">Em Andamento</MenuItem>
						<MenuItem value="Concluída">Concluída</MenuItem>
					</Select>
				</FormControl>

				<Box display="flex" alignItems="center" gap={1}>
					<Switch
						checked={isPrivateVal}
						onChange={handleChange}
						slotProps={{ input: { 'aria-label': 'controlled' } }}
					/>
					<Typography>Privado</Typography>
				</Box>

				<Stack
					direction="row"
					justifyContent="flex-end"
					spacing={1}
					sx={{ mt: 1 }}
				>
					<Button
						variant="text"
						startIcon={<ArrowBackIcon />}
						onClick={() => navigate(`/view/${task._id}`)}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						startIcon={<SaveIcon />}
						disabled={!name.trim()}
					>
						Salvar
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
};
