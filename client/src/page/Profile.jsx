import React, { useMemo } from 'react';
import navAnchors from '../util/navAnchors';
import Header from '../component/Header';
import CalcContainer from '../component/CalcContainer';
import {
  Container,
  Box,
  CardContent,
  Typography,
} from '@mui/material';
import PostCard from '../component/PostCard';

const Profile = () => {
  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/login'),
    []
  );
  return (
    <>
      <Header anchors={currentNavAnchors} />
      <CalcContainer>
        <Container maxWidth={'xl'} sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                minWidth: '16rem',
                m: '1rem',
                mr: 0,
                position: 'sticky',
                top: '86px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#e9eef5',
              }}
            >
              <CardContent>
                <Typography variant="h6">Firstname Lastname</Typography>
                <Typography variant="h6">username</Typography>
                <Typography variant="h6">email</Typography>
                <Typography variant="h6">phone</Typography>
                <Typography variant="h6">member since</Typography>
              </CardContent>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </Box>
          </Box>
        </Container>
      </CalcContainer>
    </>
  );
};

export default Profile;
