import React, {useEffect, useState} from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';
import PropTypes from 'prop-types';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {alpha} from '@mui/material/styles';
import {url} from '../util/url'

import './PostCard.css';
import {useNavigate} from "react-router-dom";

const PostCard = ({
                    category,
                    username,
                    title,
                    description,
                    price,
                    image,
                    postedTime,
                    setToCurrentPostId,
                    setToCurrentUserId,
                  }) => {

  const navigate = useNavigate();

  const onClickHandler = (e, clickLocation) => {
    if (clickLocation === 'card') {
      setToCurrentPostId();
      navigate('/post');
    } else if (clickLocation === 'user') {
      setToCurrentUserId();
      navigate('/profile');
      e.stopPropagation();
    }
  }

  if (!image) {
      image = `${url}/api/post/image/noImage.png`;
  } else {
    image = `${url}/api/post/image/${image}`;
  }

  return (
    <Card
      onClick={(e) => onClickHandler(e, 'card')}
      className="post-card"
      sx={{
        width: 345,
        maxWidth: 345,
        flexGrow: 1,
        height: 480,
        display: 'flex',
        flexDirection: 'column',
        m: '1rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 1,
        "&:hover": {
          transition: 'all 0.2s ease-out',
          transform: 'scale(1.006, 1.006)',
          boxShadow:
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.1) 0px 10px 100px 0px',
        },
        boxShadow:
          'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
      }
      }
    >
      <CardHeader
        className="post-card-header"
        title={title}
        subheader={postedTime}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="first of the item"
      />
      <Box
        component="span"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 22,
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '0.5rem',
        }}
      >
        <Box sx={{color: 'primary.main'}}>${price}</Box>
        <Box>{category}</Box>
      </Box>
      <CardContent sx={{paddingTop: '0.5rem'}}>
        <Typography
          variant="body2"
          color="text.secondary"
          className="post-card-desc"
        >
          {description}
        </Typography>
      </CardContent>
      <Box sx={{flexGrow: 1}}/>
      <CardActions
        disableSpacing
        sx={{display: 'flex', alignItems: 'center'}}
      >
        {/*<FavoriteIcon/>*/}
        {/*<ShareIcon/>*/}
        <Box sx={{flexGrow: 1}}/>
        <Box
          onClick={(e) => {
            onClickHandler(e, 'user')
          }}
          sx={{
            p: 0.5,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
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
            "&:hover": {
              p: '0.5rem',
              transform: 'scale(1.1, 1.1)',
              borderRadius: '20px'
            },
          }}
        >
          <PersonOutlineIcon/>
          {username}
        </Box>
      </CardActions>
    </Card>
  );
};

PostCard.propTypes = {
  category: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired,
  image: PropTypes.string,
  postedTime: PropTypes.string.isRequired,
};

export default PostCard;
