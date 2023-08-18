import React from 'react';
import { Box, Typography } from '@mui/material';

function Unauthorized() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="25vh"
      textAlign="center"
    >
      <Typography variant="h4">401 - Unauthorized User</Typography>
      <Typography variant="body1">
        You do not have permission to access this page.
      </Typography>
    </Box>
  );
}

export default Unauthorized;
