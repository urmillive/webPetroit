import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthContext from './Contexts/AuthContext';

import AppLoader from './Components/AppLoader';
import AppNavbar from './Components/AppNavbar';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Students from './Pages/Students/Students';

function App() {
  const { isLoading, token } = useContext(AuthContext);

  if (isLoading) return <AppLoader />

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route exact path="/" element={
          token ? <Students /> : <Navigate to="/login" />
        } />
        <Route exact path="/login" element={
          token ? <Navigate to="/" /> : <Login />
        } />
        <Route exact path="/register" element={
          token ? <Navigate to="/" /> : <Register />
        } />
      </Routes>
    </>
  );
}

export default App;
