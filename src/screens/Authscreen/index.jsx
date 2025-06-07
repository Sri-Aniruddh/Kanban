import React from 'react';
import { Container, Stack, Button, Typography, TextField } from '@mui/material'
import { useState } from 'react';
import ImageEl from '../../components/utils/imageEl';
import logoimg from '../../assets/logo.png';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import useStore from '../../store';

const initForm = {
    email: '',
    password: '',
}

const AuthScreen = () => {

    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState(initForm);
    const { setToastMsg } = useStore();

    const handleChange = e =>
        setForm(
            oldform =>
            ({
                ...oldform, [e.target.name]: e.target.value
            })
        );

    const handleAuth = async () => {
        try {
            setLoading(true);
            if (isLogin) {
                await signInWithEmailAndPassword(auth, form.email, form.password);

            } else {
                await createUserWithEmailAndPassword(auth, form.email, form.password);
            }
        } catch (error) {
            const rawCode = error.code; // e.g., "auth/email-already-in-use"
            const msg = rawCode.split("auth/")[1]?.split("-").join(" ") || "Unknown error";

            setToastMsg(msg);
            setLoading(false);
        }
    };

    const authText = isLogin ? "Don't have an account?" : "Alredy have an account?";
    ;

    return (
        <Container sx={{ mt: 10, mb: 10 }} maxWidth="xs">
            <Stack spacing={4} alignItems={'center'} textAlign={'center'}>
                <ImageEl sx={{ mt: 10, width: 200 }} src={logoimg} alt="logoImage" />
                <Typography color='rgba(255, 255, 255, 0.6)'>
                    Visualize your workflow for increasesd productivity. Access your Tasks Anytime, Anywhere.
                </Typography>

                <Stack spacing={2} >
                    <TextField
                        name="email"
                        label="Enter your email"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={form.email}
                        onChange={handleChange}
                        type='email' />

                    <TextField
                        name="password"
                        label="Enter your password"
                        variant="outlined" sx={{ width: '100%' }}
                        value={form.password}
                        onChange={handleChange}
                        type='password' />

                    <Button
                        size='large'
                        variant='contained'
                        sx={{ width: '100%' }}
                        onClick={handleAuth}
                        disabled={loading || !form.email.trim() || !form.password.trim()}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>

                </Stack>
                <Typography color='rgba(255, 255, 255, 0.6)'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsLogin(o => !o)}
                    mt={2}
                    textAlign={'center'}
                >
                    {authText}
                </Typography>
            </Stack>
        </Container>
    );
};

export default AuthScreen;