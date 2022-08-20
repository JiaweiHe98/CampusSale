import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {CardMedia} from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, handleClose, messageTitle, message, buttonTitle, image}) {
  if (image) {

    style.width = 800;
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box>
              <CardMedia xs={{maxHeight: '60vh'}} image={image} alt={'enlarged'} component={'img'}/>
            </Box>
            <Box display='flex' justifyContent='' sx={{mt: '1rem'}}>
              <Button variant={'contained'} onClick={handleClose}>{buttonTitle}</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    )
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {messageTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            {message}
          </Typography>
          <Box display='flex' justifyContent='' sx={{mt: '1rem'}}>
            <Button variant={'contained'} onClick={handleClose}>{buttonTitle}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
