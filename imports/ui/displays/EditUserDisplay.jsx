// ui/displays/EditUserDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { Meteor } from 'meteor/meteor';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Grid,
    Avatar,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    FormControl,
    InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { AccountCircle, Cake, Work } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    margin: '0 auto',
    backgroundColor: theme.palette.primary.main,
}));

const EditUserDisplay = () => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        birthday: '',
        gender: '',
        company: '',
        photo: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch user data when component mounts
    useEffect(() => {
        if (userId) {
            const userDoc = Meteor.users.findOne(userId);
            if (userDoc) {
                setUserData({
                    name: userDoc.profile?.name || '',
                    email: userDoc.emails?.[0]?.address || '',
                    birthday: userDoc.profile?.birthday || '',
                    gender: userDoc.profile?.gender || '',
                    company: userDoc.profile?.company || '',
                    photo: userDoc.profile?.photo || '',
                });
                setLoading(false);
            }
        }
    }, [userId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                setUserData(prev => ({
                    ...prev,
                    photo: event.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        const updateData = {
            profile: {
                name: userData.name,
                birthday: userData.birthday,
                gender: userData.gender,
                company: userData.company,
                photo: userData.photo,
            },
        };

        Meteor.users.update(userId, { $set: updateData }, error => {
            if (error) {
                console.error('Error updating user:', error);
                alert('Error updating profile');
            } else {
                alert('Profile updated successfully');
                setIsEditing(false);
            }
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Reset to original data
        if (userId) {
            const userDoc = Meteor.users.findOne(userId);
            if (userDoc) {
                setUserData({
                    name: userDoc.profile?.name || '',
                    email: userDoc.emails?.[0]?.address || '',
                    birthday: userDoc.profile?.birthday || '',
                    gender: userDoc.profile?.gender || '',
                    company: userDoc.profile?.company || '',
                    photo: userDoc.profile?.photo || '',
                });
            }
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Carregando Perfil...
                </Typography>
            </Container>
        );
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
                bgcolor="background.default"
            >
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Perfil do Usuário
                    </Typography>

                    <StyledCard>
                        <CardContent>
                            <Box display="flex" justifyContent="center" mb={3}>
                                <StyledAvatar>
                                    {userData.photo ? (
                                        <img
                                            src={userData.photo}
                                            alt="Profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <AccountCircle fontSize="large" />
                                    )}
                                </StyledAvatar>
                            </Box>

                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid>
                                            <TextField
                                                fullWidth
                                                label="Nome"
                                                name="name"
                                                value={userData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                value={userData.email}
                                                onChange={handleChange}
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                fullWidth
                                                label="Aniversário"
                                                name="birthday"
                                                type="date"
                                                value={userData.birthday}
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Gênero
                                                </FormLabel>
                                                <RadioGroup
                                                    row
                                                    name="gender"
                                                    value={userData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel
                                                        value="Homem"
                                                        control={<Radio />}
                                                        label="Homem"
                                                    />
                                                    <FormControlLabel
                                                        value="Mulher"
                                                        control={<Radio />}
                                                        label="Mulher"
                                                    />
                                                    <FormControlLabel
                                                        value="Outro"
                                                        control={<Radio />}
                                                        label="Outro"
                                                    />
                                                    <FormControlLabel
                                                        value="prefiro-nao-dizer"
                                                        control={<Radio />}
                                                        label="Prefiro não informar"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                fullWidth
                                                label="Empresa"
                                                name="company"
                                                value={userData.company}
                                                onChange={handleChange}
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Work />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                fullWidth
                                                label="Foto"
                                                type="file"
                                                onChange={handlePhotoChange}
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Cake />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>

                                        <Grid>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                            >
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleCancel}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Salvar
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            ) : (
                                <Grid container spacing={2}>
                                    <Grid>
                                        <Typography variant="h6">
                                            Nome
                                        </Typography>
                                        <Typography>
                                            {userData.name || 'Sem informação'}
                                        </Typography>
                                    </Grid>

                                    <Grid>
                                        <Typography variant="h6">
                                            Email
                                        </Typography>
                                        <Typography>
                                            {userData.email || 'Sem informação'}
                                        </Typography>
                                    </Grid>

                                    <Grid>
                                        <Typography variant="h6">
                                            Aniversário
                                        </Typography>
                                        <Typography>
                                            {userData.birthday ||
                                                'Sem informação'}
                                        </Typography>
                                    </Grid>

                                    <Grid>
                                        <Typography variant="h6">
                                            Gênero
                                        </Typography>
                                        <Typography>
                                            {userData.gender ||
                                                'Sem informação'}
                                        </Typography>
                                    </Grid>

                                    <Grid>
                                        <Typography variant="h6">
                                            Empresa
                                        </Typography>
                                        <Typography>
                                            {userData.company ||
                                                'Sem informação'}
                                        </Typography>
                                    </Grid>

                                    <Grid>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            mt={2}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleEdit}
                                            >
                                                Editar Perfil
                                            </Button>
                                        </Box>
                                    </Grid>

                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ArrowBackIcon />}
                                            sx={{
                                                mt: 2,
                                                maxWidth: 200,
                                                alignSelf: 'center',
                                            }}
                                            onClick={() => navigate('/home')}
                                        >
                                            Voltar ao início
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                mt: 2,
                                                maxWidth: 200,
                                                alignSelf: 'center',
                                            }}
                                            startIcon={<LogoutIcon />}
                                            onClick={() => {
                                                Meteor.logout();
                                            }}
                                        >
                                            Sair
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </StyledCard>
                </Container>
            </Box>
        </>
    );
};

export { EditUserDisplay };
