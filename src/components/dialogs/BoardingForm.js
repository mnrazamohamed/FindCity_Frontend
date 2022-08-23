import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import BoardingFormComp from '../form/BoardingForm';

const BoardingForm = () => {
  const { status, data: dialogData } = useSelector(state => state.dialog.boardingForm)
  const dispatch = useDispatch()


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("boardingForm")) }} fullWidth>
      <DialogTitle fontWeight={700} fontSize={34} textAlign="center" >{dialogData ?"Update Boarding":"Register Boarding"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx:1, my: 0, py: 0, minWidth: 500, maxHeight: 700 }}>
        <BoardingFormComp boardingData={dialogData}/>
      </DialogContent>
    </Dialog>
  )
}

export default BoardingForm