import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { AddPost, FullPost, Home, Login, Registration } from './pages';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth='lg'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Registration />} />
                    <Route path='/add-post' element={<AddPost />} />
                    <Route path='/posts/:id' element={<FullPost />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
