import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import OTPform from '../form/OTP';

const OTP = () => {

  const dispatch = useDispatch()
  const { status } = useSelector(state => state.dialog.OTP)

  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("OTP")) }}  >
      <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Verfication</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, py: 0, width: 300 }}>
        <OTPform/>
      </DialogContent>

    </Dialog >
  )
}


export default OTP