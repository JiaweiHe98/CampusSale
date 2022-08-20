import React, {useMemo} from 'react';
import {Avatar, Box, Button, Typography, Container} from '@mui/material';
import CalcContainer from '../component/CalcContainer';
import {useNavigate} from 'react-router-dom';
import navAnchors from '../util/navAnchors';
import Header from '../component/Header';

const Landing = ({user, setSeeingUserId}) => {
  const navigate = useNavigate();

  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.content !== 'home'),
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
      <Header anchors={currentNavAnchors} user={user} setSeeingUserId={setSeeingUserId}/>
      <CalcContainer>
        <Container maxWidth={'xl'}>
          <Box id={"about-container"} sx={{mt: '1rem', mb: '1rem', pl: '4rem', pr: '4rem', borderRadius: '8px'}}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 5,
              paddingBottom: 5
            }}>
              <Box>
                <Typography variant="h3" component="h3">
                  Do you have something you don't need
                </Typography>
              </Box>
              <Box sx={{p: '1rem'}}>
                <Avatar
                  alt="Don't need stuffs"
                  src="/dontneed.png"
                  sx={{width: 300, height: 300}}
                />
              </Box>

            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 5,
              paddingBottom: 5
            }}>
              <Box sx={{p: '1rem'}}>
                <Avatar
                  alt="What a pity throw them away"
                  src="/sell.png"
                  sx={{width: 300, height: 300}}
                />
              </Box>
              <Box>
                <Typography variant="h3" component="h3">
                  and you don't want to throw it away?
                </Typography>
              </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 5,
              paddingBottom: 5
            }}>
              <Box>
                <Typography variant="h3" component="h3">
                  This platform helps you sale it
                </Typography>
              </Box>
              <Box sx={{p: '1rem'}}>
                <Avatar
                  alt="Sell thing your don't need in this platform"
                  src="/sale.png"
                  sx={{width: 300, height: 300}}
                />
              </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 5,
              paddingBottom: 5
            }}>
              <Box sx={{p: '1rem'}}>
                <Avatar
                  alt="Others may need those items"
                  src="/needs.png"
                  sx={{width: 300, height: 300}}
                />
              </Box>
              <Box>
                <Typography variant="h3" component="h3">
                  or give it to the person who needs it.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 15
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
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 15
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
          </Box>
        </Container>

      </CalcContainer>
    </>
  );
};

export default Landing;
