import React, {useMemo} from 'react';
import {Box, Button, Typography} from '@mui/material';
import CalcContainer from '../component/CalcContainer';
import {useNavigate} from 'react-router-dom';
import navAnchors from '../util/navAnchors';
import Header from '../component/Header';

const Landing = () => {
  const navigate = useNavigate();

  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/'),
    []
  );

  const onClickSignUp = () => {
    navigate('/signup');
  };

  const onClickToMarketplace = () => {
    navigate('/market');
  };

  return (
    <>
      <Header anchors={currentNavAnchors}/>
      <CalcContainer>
        <Box sx={{textAlign: 'left', paddingTop: 10, paddingBottom: 10}}>
          <Typography variant="h3" component="h3">
            Do you have something you don't need
          </Typography>
        </Box>
        <Box sx={{textAlign: 'right', paddingTop: 10, paddingBottom: 10}}>
          <Typography variant="h3" component="h3">
            and you don't want to throw it away?
          </Typography>
        </Box>
        <Box sx={{textAlign: 'left', paddingTop: 10, paddingBottom: 10}}>
          <Typography variant="h3" component="h3">
            This platform helps you sale it
          </Typography>
        </Box>
        <Box sx={{textAlign: 'right', paddingTop: 10, paddingBottom: 10}}>
          <Typography variant="h3" component="h3">
            or give it to the person who needs it.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Box>
            <Typography variant="h3" component="span">
              Sign up and get started
            </Typography>
          </Box>
          <Box sx={{paddingLeft: 10, display: 'flex', alignItems: 'center'}}>
            <Button variant="outlined" size="large" onClick={onClickSignUp}>
              Sign Up
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Box sx={{paddingRight: 10, display: 'flex', alignItems: 'center'}}>
            <Button
              variant="outlined"
              size="large"
              onClick={onClickToMarketplace}
            >
              to marketplace
            </Button>
          </Box>
          <Box>
            <Typography variant="h3" component="h3">
              or hang around!
            </Typography>
          </Box>
        </Box>
      </CalcContainer>
    </>
  );
};

export default Landing;
