import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

const leaveData = [
  { type: 'Casual Leave', count: 13 },
  { type: 'Sick Leave', count: 10 },
  { type: 'Paid Leave', count: 10 },
];

const BoardContent = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {leaveData.map((leave, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                padding: 4,
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" component="div" gutterBottom>
                {leave.type}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {leave.count}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BoardContent;
