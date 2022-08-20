import React from 'react';
import {Typography, Box, Paper, Avatar, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import logout from '../util/logout'

import './Header.css';

const Header = ({anchors, user, setSeeingUserId, children}) => {
  const navigate = useNavigate();


  if (user) {
    anchors = anchors.filter((anchor) => anchor.content !== 'login')
  } else {
    anchors = anchors.filter((anchor) => anchor.content !== 'logout' && anchor.content !== 'profile')
  }

  const renderAnchor = (anchor, index) => {
    return (
      <a
        key={index}
        href={anchor.href}
        id={anchor.content === 'logout' ? 'logout' : null}
        onClick={
          anchor.content === 'logout' ? logout :
            anchor.redirect
              ? null
              : (e) => {
                if (anchor.content === 'profile') {
                  setSeeingUserId(user.id)
                }
                e.preventDefault();
                navigate(anchor.href);
              }
        }
      >
        <Typography
          variant="button"
          component="span"
          sx={{fontSize: '1rem', fontWeight: 400}}
        >
          {anchor.content}
        </Typography>
      </a>
    );
  };

  return (
    <Box className="header" sx={{zIndex: 100}}>
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
          <Box sx={{mr: '0.5rem'}}>
            <IconButton size={'small'} onClick={() => navigate('/')}>
              <Avatar
                alt="Logo"
                src="/ecommerce-box.png"
                // sx={{ width: 300, height: 300 }}
              />
            </IconButton>
          </Box>
          <Typography variant="h5" component="span">
             CampusSale
          </Typography>
          {children}
          <Box sx={{flexGrow: 1}}/>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
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
