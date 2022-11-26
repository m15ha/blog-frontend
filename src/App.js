import Container from '@mui/material/Container';

import { Header } from './components';
import { AddPost, FullPost, Home, Login, Registration } from './pages';

function App() {
    return (
        <>
            <Header />
            <Container maxWidth='lg'>
                <Home />
                {/*<FullPost />*/}
                {/*<AddPost />*/}
                {/*<Login />*/}
                {/*<Registration />*/}
            </Container>
        </>
    );
}

export default App;
