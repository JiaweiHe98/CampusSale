import React, {useState, useEffect} from 'react';
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
import {alpha} from '@mui/material/styles';
import getPostById from "../util/getPostById";
import BasicModal from "../component/BasicModal";
import {useNavigate} from "react-router-dom";
import {url} from '../util/url'
import addACommentSection from "../util/addACommentSection";

const Post = ({user, seeingPostId, setSeeingUserId}) => {

  const [seeingPost, setSeeingPost] = useState(null);
  const [revealContact, setRevealContact] = useState(false);
  const [comments, setComments] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const navigate = useNavigate()

  const [userInputComment, setUserInputComment] = useState('')

  useEffect(() => {

    const getPost = async () => {
      const post = await getPostById(seeingPostId);
      post.dateString = new Date(post.postedTime).toLocaleDateString('en-us', {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      setSeeingPost(post);
      setComments(post.commentEntityList)
    }

    if (seeingPostId != null) {
      getPost();
    }
  }, [seeingPostId])


  const revealContactHandler = () => {
    if (user) {
      setRevealContact(!revealContact);
    } else {
      setOpen(true);
    }
  }


  const imageData = [];

  if (seeingPost !== null && seeingPost.images.length > 0) {
    seeingPost.images.forEach((image) => imageData.push({img: `${url}/api/post/image/${image.url}`}))
  } else {
    imageData.push({img: `${url}/api/post/image/noImage.png`})
  }


  const handleClickUser = (userId) => {
    setSeeingUserId(userId);
    navigate('/profile')
  }

  const handleCommentSubmit = async () => {
    // console.log(userInputComment)
    const res = await addACommentSection(user.id, seeingPostId, userInputComment, user.token)
    if (res.message === 'ok') {
      setComments(res.data);
    } else if (res.message) {
      setOpen2(true)
    }
  }

  const renderContact = () => {
    return (<Paper variant="outlined" sx={{p: '1rem'}}>
      <Typography
        variant="h6">{`${seeingPost.appUserEntity.firstname} ${seeingPost.appUserEntity.lastname}`}</Typography>
      <Typography variant="body1">Email: {seeingPost.appUserEntity.email}</Typography>
      <Typography variant="body1">
        Phone: {seeingPost.appUserEntity.phoneNumber}
      </Typography>
      <Box display='flex' sx={{mt: 1}}>
        <Box
          onClick={() => handleClickUser(seeingPost.appUserEntity.id)}
          sx={{
            p: 0.8,
            backgroundColor: (theme) =>
              alpha(theme.palette.primary.main, 0.1),
            borderRadius: '5px',
            color: 'primary.main',
            fontWeight: 'medium',
            display: 'flex',
            fontSize: 12,
            alignItems: 'center',
            cursor: 'pointer',
            '& svg': {
              fontSize: 21,
              mr: 0.5,
            },
            "&:hover": {
              cursor: 'pointer',
              transform: 'scale(1.1, 1.1)',
              borderRadius: '20px'
            },
          }}
        >
          <PersonOutlineIcon/>
          {seeingPost.appUserEntity.username}
        </Box>
      </Box>
    </Paper>)
  }

  const renderComment = () => {
    if (comments != null) {
      return comments.map(commentSection => renderCommentSection(commentSection))
    }
  }

  const renderCommentSection = (commentSection) => {
    return commentSection.comments.map((comment, index) => renderCommentContent(comment.id, comment.user.id, comment.user.username, comment.comment, index === 0))
  }

  const renderCommentContent = (commentId, userId, username, comment, isFirst) => {

    const content = (<Box
      key={commentId}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: '1rem',
      }}
    >
      <Typography variant="body1">{comment}</Typography>
      <Box
        onClick={() => handleClickUser(userId)}
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
          "&:hover": {
            cursor: 'pointer',
            transform: 'scale(1.1, 1.1)',
            borderRadius: '20px'
          },
        }}
      >
        <PersonOutlineIcon/>
        {username}
      </Box>
    </Box>)

    if (isFirst) {
      return (content)
    }
    return (<Box key={commentId} sx={{pl: '2rem'}}>
      {content}
    </Box>)
  }

  return (
    <>
      <Header anchors={navAnchors} user={user} setSeeingUserId={setSeeingUserId}/>
      <BasicModal open={open} handleClose={() => setOpen(false)}
                  messageTitle={'Please login to get the contact info!'}
                  message={''} buttonTitle={'OK'}/>
      <BasicModal open={open2} handleClose={() => setOpen2(false)}
                  messageTitle={'Your token has expired! Please login again!'}
                  message={''} buttonTitle={'OK'}/>
      <CalcContainer>
        <Container
          sx={{
            mt: '2rem',
            p: '1rem',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(48, 46, 56, 0.06) 0px 3px 10px 0px'
          }}>
          {seeingPost !== null && <Box>
            <Box sx={{display: 'flex'}}>
              <Box>
                <StandardImageList imageData={imageData}/>
              </Box>
              <Box sx={{flexGrow: 1, p: '1.5rem'}}>
                <Typography
                  variant="h3"
                  component="h5"
                  sx={{marginBottom: '0.3rem'}}
                >
                  {seeingPost.title}
                </Typography>
                <Typography variant="body2">Posted on: {seeingPost.dateString}</Typography>
                <Box sx={{display: 'flex'}}>
                  <Box
                    sx={{display: 'flex', alignItems: 'center', pr: '0.5rem'}}
                  >
                    <Box component="span">Price: </Box>
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
                      ${seeingPost.price}
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body1">
                  {seeingPost.description}
                </Typography>
                <Box sx={{m: '2rem', ml: 0}}>
                  <Button variant="contained"
                          sx={{minWidth: '200px'}}
                          onClick={revealContactHandler}>{!revealContact ? 'Get Contact Info' : 'Hide Contact Info'}</Button>
                </Box>
                {revealContact && renderContact()}
              </Box>
            </Box>

            <Box className="post-comment" sx={{p: '1rem'}}>
              <Typography variant="h5">Comments</Typography>
              <Box sx={{pt: '1rem', pb: '1rem'}}>
                <TextField
                  fullWidth
                  disabled={user === null}
                  id="standard-basic"
                  label={user !== null ? `Commenting as ${user.username}` : 'Please login to add comment!'}
                  variant="standard"
                  value={userInputComment}
                  onChange={(e) => setUserInputComment(e.target.value)}
                />
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'right'}}>
                <Button disabled={user === null || !userInputComment} sx={{mr: '1rem'}}
                        onClick={() => setUserInputComment('')}>Cancel</Button>
                <Button disabled={user === null} variant="contained" onClick={handleCommentSubmit}>Comment</Button>
              </Box>
            </Box>
            <Box sx={{p: '1rem', pt: 0}}>
              {renderComment()}
            </Box>
          </Box>}
        </Container>
      </CalcContainer>
    </>
  );
};

export default Post;
