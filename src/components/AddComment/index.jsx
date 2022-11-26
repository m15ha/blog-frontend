import React from 'react';

import styles from './AddComment.module.scss';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Index = () => {
    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src='https://mui.com/static/images/avatar/5.jpg'
                />
                <div className={styles.form}>
                    <TextField
                        label='Write a comment'
                        variant='outlined'
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button variant='contained'>Submit Comment</Button>
                </div>
            </div>
        </>
    );
};