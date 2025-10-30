// ui/displays/DashBoardDisplay.jsx
import React from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/TasksCollection';
import {
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TaskAlt, Task, Person, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[3],
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const CardContentStyled = styled(CardContent)(() => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
}));

const CardIcon = styled('div')(({ theme }) => ({
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
}));

const DashBoardDisplay = () => {
    const navigate = useNavigate();

    // Use the tasksWithPrivacy publication
    useSubscribe('tasksWithPrivacy');
    const tasks = useTracker(() => {
        return TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    });

    // Calculate task statistics
    const totalTasks = tasks.filter(task => task.state === 'Cadastrada').length;
    const inProgressTasks = tasks.filter(
        task => task.state === 'Em Andamento'
    ).length;
    const completedTasks = tasks.filter(
        task => task.state === 'Concluída'
    ).length;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard
            </Typography>

            <Box display="flex" justifyContent="center" mb={4} gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Assignment />}
                    onClick={() => navigate('/tasklist')}
                >
                    Ver Tarefas
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Person />}
                    onClick={() => navigate('/user')}
                >
                    Meu Perfil
                </Button>
            </Box>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <CardContentStyled>
                            <CardIcon>
                                <TaskAlt color="success" />
                            </CardIcon>
                            <Typography variant="h5" component="h2">
                                Concluídas
                            </Typography>
                            <Typography
                                variant="h3"
                                color="success.main"
                                sx={{ mt: 1 }}
                            >
                                {completedTasks}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                Tarefas completadas
                            </Typography>
                        </CardContentStyled>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <CardContentStyled>
                            <CardIcon>
                                <Task color="warning" />
                            </CardIcon>
                            <Typography variant="h5" component="h2">
                                Em Andamento
                            </Typography>
                            <Typography
                                variant="h3"
                                color="warning.main"
                                sx={{ mt: 1 }}
                            >
                                {inProgressTasks}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                Tarefas em progresso
                            </Typography>
                        </CardContentStyled>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <CardContentStyled>
                            <CardIcon>
                                <Assignment color="primary" />
                            </CardIcon>
                            <Typography variant="h5" component="h2">
                                Cadastradas
                            </Typography>
                            <Typography
                                variant="h3"
                                color="primary.main"
                                sx={{ mt: 1 }}
                            >
                                {totalTasks}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                            >
                                Total de tarefas
                            </Typography>
                        </CardContentStyled>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export { DashBoardDisplay };
