
import { Box } from '@mui/material';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Header } from "./components/Header";
import { TodoContextProvider } from "./components/TodoContext";
import { TodoList } from "./components/TodoList";

const App: FC = () => {
    return (
        <TodoContextProvider>
            <Box className="app">
                <Box className="app-container">
                    <Header />
                    <TodoList />
                </Box>
                <ToastContainer />
            </Box>
        </TodoContextProvider>
    );
}
export default App;