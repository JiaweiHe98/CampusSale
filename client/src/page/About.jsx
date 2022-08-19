import React, { useMemo } from 'react';
import Header from '../component/Header';
import navAnchors from '../util/navAnchors';

const About = () => {
  const currentNavAnchors = useMemo(
    () => navAnchors.filter((anchor) => anchor.href !== '/about'),
    []
  );

  return (
    <>
      <Header anchors={currentNavAnchors} />
    </>
  );
};

export default About;
