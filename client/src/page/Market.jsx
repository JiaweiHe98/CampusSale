import React, { useMemo } from 'react';
import CalcContainer from '../component/CalcContainer';
import Header from '../component/Header';
import PostCard from '../component/PostCard';
import navAnchors from '../util/navAnchors';
import { Box } from '@mui/material';

const Market = () => {
  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/market'),
    []
  );

  return (
    <>
      <Header anchors={currentNavAnchors} />
      <CalcContainer>
        <Box sx={{ display: 'flex' }}>
          <PostCard
            category={'Book'}
            username={'tom123321'}
            title={'C++ Primer'}
            description={'A great way to learn cpp'}
            price={'$19.99'}
            image={'cpp_primer.jpg'}
            postedTime={'8/17/2022'}
          />
        </Box>
      </CalcContainer>
    </>
  );
};

export default Market;
