import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import styles from './Login.module.scss';

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async values => {
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            setError('email', {
                type: 'manual',
                message: 'Invalid email or password',
            });
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: 'E-Mail is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid e-mail address',
                        },
                    })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label='Password'
                    type='password'
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    fullWidth
                />
                <Button
                    type='submit'
                    size='large'
                    variant='contained'
                    fullWidth
                    disabled={!isValid}
                >
                    Login
                </Button>
            </form>
        </Paper>
    );
};
