import Button from '@mui/material/Button';
import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import styles from './Header.module.scss';

export const Header = () => {
    const isAuth = false;

    const onClickLogout = () => {};

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
                                        Create an account
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
