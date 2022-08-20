import React, {useMemo} from 'react';
import Header from '../component/Header';
import navAnchors from '../util/navAnchors';
import {Typography, Box, Container, Avatar} from '@mui/material';

const About = ({user, setSeeingUserId}) => {
  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/about'),
    []
  );

  return (
    <>
      <Header anchors={currentNavAnchors} user={user} setSeeingUserId={setSeeingUserId}/>
      <Container maxWidth={'lg'}>
        <Box sx={{
          display: 'flex',
          m: '3rem',
          p: '2rem',
          backgroundColor: '#fff',
          boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
          borderRadius: '8px',
          color: '#232629',
        }}>
          <Box sx={{
            flexGrow: 4,
          }}>
            {/*<Typography variant='h6'>A Jiawei He's Project</Typography>*/}
            <Box sx={{m: '1rem'}}>
              <Typography variant='h3'>
                About CampusSale
              </Typography>
            </Box>
            {/*<Typography variant='h4'>*/}
            {/*  Build by student for student.*/}
            {/*</Typography>*/}
            <Box sx={{m: '1rem'}}>
              <Typography variant='h5'>
                Life can be challenging when graduating and moving.
                This app helps students selling their unused stuff or exchange for things they need.
                Thanks the developer of React, Material UI, Spring Boot, Spring Data JPA, MySQL for making this
                project
                possible!
                Feel free to copy it, modify it, or make it as part of your own project.
              </Typography>
            </Box>
          </Box>
          <Box sx={{flexGrow: 1, display:'flex', alignItems: 'center', p: '1rem'}}>
            <Avatar
              alt="Made by student for students."
              src="/about.png"
              sx={{ width: 300, height: 300 }}
            />
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          m: '3rem',
          p: '2rem',
          backgroundColor: '#fff',
          boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
          borderRadius: '8px',
          color: '#232629',
        }}>
          <Box sx={{
            flexGrow: 4,
          }}>
            {/*<Typography variant='h6'>A Jiawei He's Project</Typography>*/}
            <Box sx={{m: '1rem'}}>
              <Typography variant='h3'>
                About the Developer
              </Typography>
            </Box>
            {/*<Typography variant='h4'>*/}
            {/*  Build by student for student.*/}
            {/*</Typography>*/}
            <Box sx={{m: '1rem'}}>
              <Typography variant='h5'>
                My name is Jiawei He. I am now taking a master of science degree in Scientific Computing (Computational Science) at University of Pennsylvania.
                I'm enthusiastic about coding, eager to learn new technologies and frameworks and seeking for a career as software developer for backend or fullstack.
                Thank to for your visit to the web app! This app is made by student for students. Enjoy!
              </Typography>
            </Box>
          </Box>
          <Box sx={{flexGrow: 1, display:'flex', alignItems: 'center', p: '1rem'}}>
            <Avatar
              alt="Jiawei He."
              src="/jiaweihe.jpg"
              sx={{ width: 300, height: 300 }}
            />
          </Box>
        </Box>

      </Container>
    </>
  );
};

export default About;
