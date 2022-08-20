import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import './ImageList.css';
import BasicModal from "./BasicModal";

export default function StandardImageList({imageData}) {
  const [modalOn, setModalOn] = React.useState(false);
  const [modalImage, setModalImage] = React.useState(false);

  const onClickHandler = (image) => {
    setModalImage(image)
    setModalOn(true);
  }

  let cols = 1;

  if (imageData.length > 1) {
    cols = 2;
  }

  return (
    <>
      <BasicModal open={modalOn} handleClose={() => setModalOn(false)}
                  image={modalImage} buttonTitle={'close'}/>
      <ImageList
        className="image-list"
        sx={{ width: 500, height: 450, backgroundColor: '#fff' }}
        cols={cols}
        rowHeight={242}
      >
        {imageData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.img}
              loading="lazy"
              onClick={() => onClickHandler(item.img)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>

  );
}


