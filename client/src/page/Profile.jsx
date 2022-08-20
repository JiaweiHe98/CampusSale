import React, {useMemo, useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import navAnchors from '../util/navAnchors';
import Header from '../component/Header';
import CalcContainer from '../component/CalcContainer';
import {
  Container,
  Box,
  CardContent,
  Typography,
  Switch,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import PostCard from '../component/PostCard';
import getUserSavedPost from "../util/getUserSavedPost";
import {getUserInfoById} from "../util/getUserInfo";
import getPosts from "../util/getPosts";
import addAPost from "../util/addAPost";
import BasicModal from "../component/BasicModal";


const Android12Switch = styled(Switch)(({theme}) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Profile = ({user, setUser, seeingUserId, setSeeingPostId, setSeeingUserId}) => {

  const [userSavedPosts, setUserSavedPosts] = useState(null);
  const [seeingUser, setSeeingUser] = useState(null);
  const [seeingUserPosts, setSeeingUserPosts] = useState(null);

  const [activatePost, setActivatePost] = useState(false);

  const [category, setCategory] = useState('OTHERS');
  const [title, setTitle] = useState({value: "", valid: true});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState({value: "", valid: true});
  const [images, setImages] = useState([]);

  const [modalOn, setModalOn] = useState(false);
  const [modalProps, setModalProps] = useState({})

  useEffect(() => {
    const getUserSaved = async () => {
      setUserSavedPosts(await getUserSavedPost(user));
    }

    if (user != null) {
      getUserSaved();
    }
  }, [user])

  // read seeing user info
  useEffect(() => {
    const getUserInfo = async () => {
      if (seeingUserId == null) {
        return;
      }
      const userToSee = await getUserInfoById(seeingUserId);
      userToSee.date = Date.parse(userToSee.registeredTime)
      userToSee.dateString = new Date(userToSee.date).toLocaleDateString('en-us', {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
      setSeeingUser(userToSee)
    }

    try {
      if (user !== null && seeingUserId === user.id) {
        setSeeingUser(user);
      } else {
        getUserInfo();
      }
    } catch (e) {
      setSeeingUser(null)
    }
  }, [user, seeingUserId])

  // to set state 5
  useEffect(() => {
    const getUserPosts = async () => {
      if (seeingUserId == null) {
        return;
      }
      const seeingUserPosts = await getPosts(seeingUserId);
      setSeeingUserPosts(seeingUserPosts);
    }

    try {
      getUserPosts()
    } catch (e) {
      setSeeingUserPosts(null);
    }
  }, [seeingUserId, seeingUser])

  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/login'),
    []
  );

  const [likeOn, setLikeOn] = useState(false);

  const handleSubmit = async () => {
    if (!title.value || !price.valid) {
      setModalOn(true);
    } else {
      const res = await addAPost(user.id, category, title.value, description, price.value, images, user.token)
      console.log(res)
      if (res.status === 201) {
        const seeingUserPosts = await getPosts(seeingUserId);
        setSeeingUserPosts(seeingUserPosts);
        setModalProps({messageTitle: 'Success', buttonTitle: 'OK', message: 'Your post has been published!'})
        setModalOn(true);
      } else if (res.status === 403) {
        setModalProps({
          messageTitle: 'Error',
          buttonTitle: 'OK',
          message: 'Your token has expired! Please login again!'
        })
        setModalOn(true);
      } else {
        setModalProps({
          messageTitle: 'Error',
          buttonTitle: 'OK',
          message: 'Cannot process your post! Please check your connection and make sure that all input is valid!'
        })
        setModalOn(true);
      }
    }

    console.log(user.id, category, title.value, description, price.value, images);
  }

  const handleTitle = (e) => {
    if (e.target.value.length === 0) {
      setTitle({value: e.target.value, valid: false})
    } else {
      setTitle({value: e.target.value, valid: true})
    }
  }

  const handlePrice = (e) => {
    if (+e.target.value < 0) {
      setPrice({value: e.target.value, valid: false})
    } else {
      setPrice({value: e.target.value, valid: true})
    }
  }

  let isSelf = false;
  if (user !== null && seeingUser !== null) {
    isSelf = user.id === seeingUser.id
  }

  if (seeingUser !== null && user === null) {
    seeingUser.email = 'Reveal after login!';
    seeingUser.phoneNumber = 'Reveal after login!'
  }

  const renderSeeingUserInfo = () => {
    if (seeingUser) {
      return (
        <>
          <Box>
            <Typography variant="h6">{seeingUser.firstname + " " + seeingUser.lastname}</Typography>
            <Typography variant="body1">@{seeingUser.username}</Typography>
          </Box>
          <Box sx={{mt: '1rem'}}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">{seeingUser.email}</Typography>
          </Box>
          <Box sx={{mt: '1rem'}}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="body1">{seeingUser.phoneNumber}</Typography>
          </Box>
          <Box sx={{mt: '1rem'}}>
            <Typography variant="h6">User Since</Typography>
            <Typography variant="body1">{seeingUser.dateString}</Typography>
          </Box>
          {
            isSelf && <Box sx={{mt: '1rem'}}>
              <Typography variant="h6">View Saved</Typography>
              <Android12Switch
                checked={likeOn}
                onChange={() => setLikeOn(!likeOn)}
              />
            </Box>
          }
        </>
      )
    } else {
      return (<Box/>)
    }
  }

  const renderAddAPost = () => {
    if (user !== null && user.id === seeingUserId) {
      return (
        <>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <Typography variant="h6">Add to market for sale</Typography>
            </Box>
            <Box>
              <Android12Switch
                checked={activatePost}
                onChange={() => setActivatePost(!activatePost)}
              />
            </Box>
          </Box>
          <Box sx={{mt: '1rem'}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category *</InputLabel>
              <Select
                fullWidth
                disabled={!activatePost}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{bgcolor: '#fff', mb: '1rem'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
              >
                <MenuItem value={'TEXTBOOKS'}>Textbook</MenuItem>
                <MenuItem value={'BOOKS'}>Book</MenuItem>
                <MenuItem value={'ELECTRONICS'}>Electronics</MenuItem>
                <MenuItem value={'FURNITURE'}>Furniture</MenuItem>
                <MenuItem value={'CLOTHING'}>Clothing</MenuItem>
                <MenuItem value={'OTHERS'}>Others</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled={!activatePost}
              required
              fullWidth
              error={!title.valid}
              value={title.value}
              onChange={handleTitle}
              sx={{bgcolor: '#fff', mb: '1rem'}}
              id="title"
              label="Title"
            />
            <TextField
              disabled={!activatePost}
              sx={{bgcolor: '#fff', mb: '1rem', minHeight: '2rem'}}
              fullWidth
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              label="Description"
              multiline
            />
            <TextField
              disabled={!activatePost}
              sx={{bgcolor: '#fff', mb: '1rem'}}
              required
              fullWidth
              error={!price.valid}
              value={price.value}
              onChange={handlePrice}
              label="Price"
              id="price"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Box>
              <Typography variant="body1">Add images</Typography>
              <TextField
                disabled={!activatePost}
                fullWidth
                sx={{bgcolor: '#fff', mt: '0.5rem', mb: '1rem'}}
                // value={images}
                onChange={(e) => setImages(e.target.files)}
                id="Image"
                label=""
                inputProps={{accept: 'image/png, image/jpeg', multiple: true}}
                type={'file'}
              />
            </Box>

            <Button fullWidth variant="outlined" onClick={handleSubmit} disabled={!activatePost}>publish</Button>
          </Box>
        </>
      )
    }
  }

  const renderPosts = () => {
    if (seeingUserPosts) {
      if (!likeOn) {
        return seeingUserPosts.map((post) => {
          const dateString = new Date(post.postedTime).toLocaleDateString('en-us', {
            year: "numeric",
            month: "short",
            day: "numeric"
          });

          const imageName = post.images.length > 0 ? post.images[0].url : null
          return (
            <PostCard key={post.id}
                      setToCurrentUserId={() => {
                        setSeeingUserId(post.appUserEntity.id)
                      }}
                      setToCurrentPostId={() => {
                        setSeeingPostId(post.id)
                      }}
                      image={imageName}
                      price={post.price.toFixed(2)}
                      username={post.appUserEntity.username}
                      category={post.category} title={post.title}
                      postedTime={'Posted on: ' + dateString}/>
          )
        })
      } else {
        return userSavedPosts.map((post) => {
          const dateString = new Date(post.postedTime).toLocaleDateString('en-us', {
            year: "numeric",
            month: "short",
            day: "numeric"
          });
          return (
            <PostCard key={post.id}
                      setToCurrentPostId={() => {
                        setSeeingPostId(post.id)
                      }}
                      price={post.price.toFixed(2)}
                      username={post.appUserEntity.username}
                      category={post.category} title={post.title}
                      postedTime={'Posted on: ' + dateString}/>
          )
        })
      }
    } else {
      return (<Box/>)
    }
  }

  return (
    <>
      <Header anchors={currentNavAnchors} user={user} setSeeingUserId={setSeeingUserId}/>
      <BasicModal open={modalOn} handleClose={() => setModalOn(false)} messageTitle={modalProps.messageTitle}
                  buttonTitle={modalProps.buttonTitle} message={modalProps.message}/>
      <CalcContainer>
        <Container maxWidth={'xl'} sx={{display: 'flex'}}>
          <Box sx={{flexGrow: 1}}>
            <Box sx={{position: 'sticky', top: '86px'}}>
              <Box
                sx={{
                  minWidth: '16rem',
                  maxWidth: '20rem',
                  m: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#e9eef5df',
                }}
              >
                <CardContent>
                  {renderSeeingUserInfo()}
                </CardContent>
              </Box>
              <Box
                sx={{
                  minWidth: '16rem',
                  maxWidth: '20rem',
                  m: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#e9eef5df',
                }}
              >
                <CardContent>
                  {renderAddAPost()}
                </CardContent>
              </Box>
            </Box>
          </Box>
          <Box sx={{flexGrow: 5}}>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
              {renderPosts()}
            </Box>
          </Box>
        </Container>
      </CalcContainer>
    </>
  );
};

export default Profile;
