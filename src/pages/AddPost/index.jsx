import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import 'easymde/dist/easymde.min.css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';
import { selectIsAuth } from '../../redux/slices/auth';
import styles from './AddPost.module.scss';

export const AddPost = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputFileRef = useRef(null);

    const handleChangeFile = async () => {
        try {
            const formData = new FormData();
            const file = inputFileRef?.current?.files?.[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            console.log('🚀 ~ data', data)
            setImageUrl(data.url);
        } catch (error) {
            console.warn(error);
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = useCallback(value => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('/posts', {
                title,
                text,
                tags,
                imageUrl,
            });
            const id = data._id;
            navigate(`/post/${id}`);
        } catch (error) {
            console.warn(error);
        } finally {
            setIsLoading(false);
        }
    };

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <Paper style={{ padding: 30 }}>
            <Button
                onClick={() => inputFileRef.current.click()}
                variant='outlined'
                size='large'
            >
                Download preview
            </Button>
            <input
                ref={inputFileRef}
                type='file'
                onChange={handleChangeFile}
                hidden
            />
            {imageUrl && (
                <>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={onClickRemoveImage}
                    >
                        Remove
                    </Button>
                    <img
                        className={styles.image}
                        src={`http://localhost:4444${imageUrl}`}
                        alt='Uploaded'
                    />
                </>
            )}

            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant='standard'
                placeholder='Article title...'
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                classes={{ root: styles.tags }}
                variant='standard'
                placeholder='Tags'
                value={tags}
                onChange={e => setTags(e.target.value)}
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size='large' variant='contained'>
                    Publish
                </Button>
                <a href='/'>
                    <Button size='large'>Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
