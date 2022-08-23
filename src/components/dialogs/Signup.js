import { Dialog, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import SingupForm from '../form/Signup';

const Signup = () => {
  const { status } = useSelector(state => state.dialog.signup)
  const dispatch = useDispatch()

  return (
    <Dialog 
      open={status} onClose={() => { dispatch(dialogActions.hide("signup")) }} sx={style_dialog}>
      <Typography fontWeight={700} fontSize={34} sx={{ mt: 3, mb: 1 }} textAlign="center">Register</Typography>
      <SingupForm />
    </Dialog >
  )
}

export default Signup

const style_dialog = {
  "& .MuiPaper-root": { px:2, bgcolor:"#f8f8f8"}
}