import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { HOME, ERROR, REGISTER_PAGE, LOGIN_PAGE, USERS_PAGE } from './pathes';
import { UserList } from './components/UserList';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import UsersPage from './pages/UsersPage';

function App() {
    return (
        // <div className="App">
        //     {/* <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //     Edit <code>src/App.tsx</code> and save to reload.
        //     </p>
        //     <a
        //     className="App-link"
        //     href="https://reactjs.org"
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     >
        //     Learn React
        //     </a>
        // </header> */}
        //     <UserList />
        // </div>
        <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          } />
          <Route path={ERROR} element={
            <PublicLayout>
              <ErrorPage />
            </PublicLayout>
          } />
          <Route path={USERS_PAGE} element={
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          } />
        </Routes>
      </BrowserRouter>
    </>
    );
}

export default App;
