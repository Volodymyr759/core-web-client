import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

export default function App() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

