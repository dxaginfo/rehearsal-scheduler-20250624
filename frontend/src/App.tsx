import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { checkAuthStatus } from './features/auth/authSlice';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RehearsalList from './pages/rehearsals/RehearsalList';
import RehearsalDetail from './pages/rehearsals/RehearsalDetail';
import BandList from './pages/bands/BandList';
import BandDetail from './pages/bands/BandDetail';
import SetlistList from './pages/setlists/SetlistList';
import SetlistDetail from './pages/setlists/SetlistDetail';
import NotFound from './pages/NotFound';

// Private route wrapper
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAppSelector(state => state.auth);
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        
        <Route path="rehearsals">
          <Route index element={<RehearsalList />} />
          <Route path=":id" element={<RehearsalDetail />} />
        </Route>
        
        <Route path="bands">
          <Route index element={<BandList />} />
          <Route path=":id" element={<BandDetail />} />
        </Route>
        
        <Route path="setlists">
          <Route index element={<SetlistList />} />
          <Route path=":id" element={<SetlistDetail />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;