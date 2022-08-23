import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBoarding from '../../pages/MyBoarding';
import { dialogActions } from '../../store/dialogSlice';

const BoardingDetails = () => {

    const dispatch = useDispatch()
    const { status,data } = useSelector(state => state.dialog.boardingDetails)

    return (
        <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("boardingDetails")) }} maxWidth="xl" >
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", mx: 2, my: 0, py: 0, minWidth:1408, maxHeight:700}}>
                <MyBoarding boardingID={data} />
            </DialogContent>
        </Dialog >
    )
}



export default BoardingDetails