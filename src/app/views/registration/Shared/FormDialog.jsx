import React from 'react';
import { Box, Fab, Icon } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddNewReg from './AddNewReg';

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
        <DialogTitle id="form-dialog-title">Add New Registration</DialogTitle>
        <DialogActions >
          <Fab size="small" sx={{ mt: "-80px", mr: 2, backgroundColor: "white" }} onClick={handleClose} >
            <Icon color='error'>close</Icon>
          </Fab>
        </DialogActions>
        <DialogContent>
          <AddNewReg />
        </DialogContent>

      </Dialog>
    </Box>
  );
}
