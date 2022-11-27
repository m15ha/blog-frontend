import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const onClickLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(logout()); 
            window.localStorage.removeItem('token');           
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth='lg'>
                <div className={styles.inner}>
                    <Link className={styles.logo} to='/'>
                        <div>LAZAREV BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to='/posts/create'>
                                    <Button variant='contained'>
                                        To write an article
                                    </Button>
                                </Link>
                                <Button
                                    onClick={onClickLogout}
                                    variant='contained'
                                    color='error'
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button variant='outlined'>Login</Button>
                                </Link>
                                <Link to='/register'>
                                    <Button variant='contained'>
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
