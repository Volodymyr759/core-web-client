// import { BrowserRouter } from 'react-router-dom'; For Github pages replaced BrowserRouter to HashRouter
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

export default function App() {
    return (
        <HashRouter>
            <AppRouter />
        </HashRouter>
    );
}

