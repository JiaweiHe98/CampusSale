import React, {useEffect, useMemo, useState} from 'react';
import CalcContainer from '../component/CalcContainer';
import Header from '../component/Header';
import PostCard from '../component/PostCard';
import navAnchors from '../util/navAnchors';
import SearchIcon from '@mui/icons-material/Search';
import {Box, InputBase, IconButton} from '@mui/material';
import getMarketPosts from "../util/getMarketPosts";

const Market = ({user, setSeeingPostId, setSeeingUserId}) => {
  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/market'),
    []
  );

  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      setPosts(await getMarketPosts())
    }

    getPosts();
  }, []);

  const renderPosts = () => {
    if (posts) {
      return posts.filter((post) => {
        const titleOk = post.title.includes(search)
        const descriptionOk = post.description.includes(search)
        const priceOk = (post.price.toFixed(2) + "").includes(search)
        const usernameOk = post.appUserEntity.username.includes(search)

        return titleOk || descriptionOk || priceOk || usernameOk
      }).map((post) => {
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
                    price={post.price.toFixed(2)}
                    username={post.appUserEntity.username}
                    category={post.category} title={post.title}
                    image={imageName}
                    postedTime={'Posted on: ' + dateString}/>
        )
      })
    } else {
      return (<Box/>)
    }
  }

  return (
    <>
      <Header anchors={currentNavAnchors} user={user} setSeeingUserId={setSeeingUserId}>
        <Box sx={{width: 500}}>
          <InputBase
            sx={{ml: 5, flex: 1}}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            inputProps={{'aria-label': 'Search', style: {padding: 0}}}
          />
          <IconButton type="button" sx={{p: '10px'}} aria-label="search">
            <SearchIcon/>
          </IconButton>
        </Box>
      </Header>
      <CalcContainer>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          {renderPosts()}
        </Box>
      </CalcContainer>
    </>
  );
};

export default Market;
