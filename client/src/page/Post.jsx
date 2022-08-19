import React from 'react';
import CalcContainer from '../component/CalcContainer';
import Header from '../component/Header';
import navAnchors from '../util/navAnchors';
import StandardImageList from '../component/ImageList';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Container,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { alpha } from '@mui/material/styles';

const Post = () => {
  return (
    <>
      <Header anchors={navAnchors} />
      <CalcContainer>
        <Container>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <StandardImageList />
            </Box>
            <Box sx={{ flexGrow: 1, p: '1rem' }}>
              <Typography
                variant="h3"
                component="h5"
                sx={{ marginBottom: '0.3rem' }}
              >
                title
              </Typography>
              <Typography variant="body2">Posted on:</Typography>
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', pr: '0.5rem' }}
                >
                  <Box component="span">Price:</Box>
                </Box>
                <Box>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      color: '#b12704',
                      fontSize: 22,
                      p: '1rem',
                      pl: 0,
                    }}
                  >
                    $12.00
                  </Box>
                </Box>
              </Box>

              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
                recusandae, dolores reprehenderit, asperiores architecto
                exercitationem saepe neque error, cum commodi reiciendis!
                Temporibus aut ea eligendi. Laudantium tempora itaque quidem
                sunt.
              </Typography>
              <Box sx={{ m: '2rem', ml: 0 }}>
                <Button variant="contained">Get Contect Info</Button>
              </Box>
              <Paper variant="outlined" sx={{ p: '1rem' }}>
                <Typography variant="h6">Name: Tom Hankers</Typography>
                <Typography variant="body1">Email: tom@gmail.com</Typography>
                <Typography variant="body1">
                  Phone: {'(123) 321 - 1234'}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Box className="post-comment" sx={{ p: '1rem' }}>
            <Typography variant="h5">Comments</Typography>
            <Box sx={{ pt: '1rem', pb: '1rem' }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Commenting as tom123"
                variant="standard"
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button sx={{ mr: '1rem' }}>Cancel</Button>
              <Button variant="contained">Comment</Button>
            </Box>
          </Box>
          <Box sx={{ p: '1rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">This is a comment</Typography>
              <Box
                sx={{
                  p: 0.5,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                  borderRadius: '5px',
                  color: 'primary.main',
                  fontWeight: 'medium',
                  display: 'flex',
                  fontSize: 12,
                  alignItems: 'center',
                  '& svg': {
                    fontSize: 21,
                    mr: 0.5,
                  },
                }}
              >
                <PersonOutlineIcon />
                py 123
              </Box>
            </Box>
            <Box sx={{ pl: '2rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: '1rem',
                }}
              >
                <Typography variant="body1">This is a comment</Typography>
                <Box
                  sx={{
                    p: 0.5,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                    borderRadius: '5px',
                    color: 'primary.main',
                    fontWeight: 'medium',
                    display: 'flex',
                    fontSize: 12,
                    alignItems: 'center',
                    '& svg': {
                      fontSize: 21,
                      mr: 0.5,
                    },
                  }}
                >
                  <PersonOutlineIcon />
                  py 123
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </CalcContainer>
    </>
  );
};

export default Post;
