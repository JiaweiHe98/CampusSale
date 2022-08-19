import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = ({ anchors }) => {
  const navigate = useNavigate();

  const renderAnchor = (anchor, index) => {
    return (
      <a
        key={index}
        href={anchor.href}
        onClick={
          anchor.redirect
            ? null
            : (e) => {
                e.preventDefault();
                navigate(anchor.href);
              }
        }
      >
        <Typography
          variant="button"
          component="span"
          sx={{ fontSize: '1rem', fontWeight: 400 }}
        >
          {anchor.content}
        </Typography>
      </a>
    );
  };

  return (
    <Box className="header">
      <Paper
        variant="outlined"
        className="paper"
        square
        sx={{
          border: 'none',
          boxShadow:
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 1.5,
            paddingBottom: 1.5,
          }}
        >
          <Typography variant="h5" component="span">
            (Avatar) CompusSale
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {anchors.map((anchor, index) => renderAnchor(anchor, index))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const anchor = {
  href: PropTypes.string,
  content: PropTypes.string,
  redirect: PropTypes.bool,
};

Header.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape(anchor)),
};

export default Header;
