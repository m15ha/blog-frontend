import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import styles from './Login.module.scss';

export const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async values => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            setError('email', {
                type: 'manual',
                message: 'The email is already in use',
            });
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Create account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    {...register('fullName', {
                        required: 'FullName is required',
                    })}
                    className={styles.field}
                    label='Full name'
                    fullWidth
                />
                <TextField
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: 'E-Mail is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid e-mail address',
                        },
                    })}
                    className={styles.field}
                    label='E-Mail'
                    fullWidth
                />
                <TextField
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    className={styles.field}
                    label='Password'
                    type='password'
                    fullWidth
                />
                <Button
                    type='submit'
                    size='large'
                    variant='contained'
                    fullWidth
                    disabled={!isValid}
                >
                    Register
                </Button>
            </form>
        </Paper>
    );
};
