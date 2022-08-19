import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { alpha } from '@mui/material/styles';

import './PostCard.css';

const PostCard = ({
  category,
  username,
  title,
  description,
  price,
  image,
  postedTime,
}) => {
  if (!image) {
    image = 'noImage.png';
  }

  return (
    <Card
      className="post-card"
      sx={{
        minWidth: 245,
        maxWidth: 445,
        flexGrow: 1,
        height: 480,
        display: 'flex',
        flexDirection: 'column',
        m: '1rem',
        border: 'none',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px',
      }}
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
        <Box sx={{ color: 'primary.main' }}>{price}</Box>
        <Box>{category}</Box>
      </Box>
      <CardContent sx={{ paddingTop: '0.5rem' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          className="post-card-desc"
        >
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions
        disableSpacing
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box
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
          }}
        >
          <PersonOutlineIcon />
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
