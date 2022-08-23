import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UpdatePasswordForm from '../form/UpdatePassword';
import { dialogActions } from '../../store/dialogSlice';

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const { status, data: { user } } = useSelector(state => state.dialog.UpdatePassword)

  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("UpdatePassword"))}} >
      <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Update password</DialogTitle>
      <UpdatePasswordForm userID={user?._id} />
    </Dialog >
  )
}


export default UpdatePassword