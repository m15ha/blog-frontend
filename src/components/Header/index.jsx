import Button from '@mui/material/Button';
import React from 'react';

import Container from '@mui/material/Container';
import styles from './Header.module.scss';

export const Header = () => {
    const isAuth = false;

    const onClickLogout = () => {};

    return (
        <div className={styles.root}>
            <Container maxWidth='lg'>
                <div className={styles.inner}>
                    <a className={styles.logo} href='/'>
                        <div>LAZAREV BLOG</div>
                    </a>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <a href='/posts/create'>
                                    <Button variant='contained'>
                                        To write an article
                                    </Button>
                                </a>
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
                                <a href='/login'>
                                    <Button variant='outlined'>Login</Button>
                                </a>
                                <a href='/register'>
                                    <Button variant='contained'>
                                        Create an account
                                    </Button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
