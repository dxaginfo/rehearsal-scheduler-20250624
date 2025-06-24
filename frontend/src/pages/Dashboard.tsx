import React, { useEffect } from 'react';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name || 'Musician'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your rehearsals, bands, and setlists all in one place.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Upcoming Rehearsals */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Rehearsals
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                You don't have any upcoming rehearsals scheduled.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/rehearsals')}
            >
              Schedule Rehearsal
            </Button>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/bands')}
                fullWidth
              >
                Create Band
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/setlists')}
                fullWidth
              >
                Create Setlist
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/rehearsals')}
                fullWidth
              >
                Schedule Rehearsal
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent activity to display.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;