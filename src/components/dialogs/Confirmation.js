import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';

const Confirmation = () => {
  const { status, onSubmit, data } = useSelector(state => state.dialog.confirmation)
  const dispatch = useDispatch()

  const handleOnClick = ({ innerText }) => {
    if (innerText === "Yes") onSubmit()
    dispatch(dialogActions.hide('confirmation'))
  }

  if (data)
    return (
      <Dialog open={status} onClose={() => { dispatch(dialogActions.hide('confirmation')) }}>
        <DialogTitle fontWeight={700} fontSize={22}>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText color="text.main" fontSize={16}>{data}</DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button
            variant='contained'
            size="small"
            onClick={e => handleOnClick(e.currentTarget)}>
            No
          </Button>
          <Button
            variant='contained'
            size="small"
            onClick={e => handleOnClick(e.currentTarget)}
            sx={{ "&:hover": { bgcolor: "red !important" } }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default Confirmation