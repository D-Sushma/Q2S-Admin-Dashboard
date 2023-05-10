import React from 'react';
import { Box, Fab, Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddNewReg from './AddNewReg';
// import NewRegistration from './NewRegistration';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Fab size="small" color="primary" aria-label="Add" className="button" sx={{ marginRight: 3 }} onClick={handleClickOpen}>
        <Icon>add</Icon>
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose} sx={{ mt: "-50px", mr: 2 }}>
            X
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
        <DialogContent>
          <AddNewReg />
        </DialogContent>

      </Dialog>
    </Box>
  );
}
