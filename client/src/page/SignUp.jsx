import React, { useMemo } from 'react';
import navAnchors from '../util/navAnchors';
import Header from '../component/Header';
import { Paper, Box, Container } from '@mui/material';
import Stepper from '../component/SignUpStepper';

const SignUp = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header anchors={navAnchors} />
        <Container
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              width: '60%',
              p: '1.5rem',
              border: 'none',
              borderRadius: '8px',
              boxShadow:
                'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
            }}
          >
            <Stepper></Stepper>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default SignUp;

{
  /* <Box sx={{ textAlign: 'center', p: '1rem' }}>
              
            
            <Box sx={{ textAlign: 'right', pr: '0.3rem' }}>
              <Button variant="contained">Sign Up</Button>
            </Box> */
}
