import React, {useMemo, useState} from 'react';
import navAnchors from '../util/navAnchors';
import Header from '../component/Header';
import {
  Paper,
  Box,
  TextField,
  Container,
  Typography,
  Button,
} from '@mui/material';
import login from '../util/login';
import {useNavigate} from 'react-router-dom';
import BasicModal from "../component/BasicModal";

const Login = ({setUser, setSeeingUserId}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/login'),
    []
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleHitEnter = (e) => {
    if (e.key === 'Enter' && username !== null && password !== null) {
      handleLogin();
    }
  }

  const onClickSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    const user = await login(username, password, setUser, setSeeingUserId);
    if (user) {
      navigate('/profile')
    } else {
      handleOpen();
    }

  };

  const enableLogin = username && password;

  return (
    <>
      <BasicModal open={open} handleClose={handleClose} messageTitle={'Login failed!'}
                  message={'Please check your username and password!'} buttonTitle={'OK'}/>
      <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <Header anchors={currentNavAnchors}/>
        <Container
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            sx={{
              width: '60%',
              p: '1.5rem',
              border: 'none',
              borderRadius: '8px',
              boxShadow:
                'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
            }}
          >
            <Box sx={{p: '1rem', pl: 0}}>
              <Typography variant="h4">Login</Typography>
            </Box>
            <TextField
              fullWidth
              required
              value={username}
              onChange={handleUsername}
              id="username"
              label="Username"
              sx={{mb: '1rem'}}
            />
            <TextField
              fullWidth
              required
              value={password}
              onChange={handlePassword}
              id="password"
              label="Password"
              type="password"
              sx={{mb: '1rem'}}
              onKeyDown={handleHitEnter}
            />
            <Box sx={{textAlign: 'right', pr: '0.3rem'}}>
              <Button sx={{mr: '1rem'}} onClick={onClickSignUp}>
                Sign up
              </Button>
              <Button
                variant="contained"
                disabled={!enableLogin}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
