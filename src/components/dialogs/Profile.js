import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import ProfileForm from '../form/Profile';

const Profile = () => {
    const { status, data } = useSelector(state => state.dialog.profile)
    const dispatch = useDispatch()
    return (
        <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("profile")) }} >
            <DialogTitle fontWeight={700} fontSize={34} textAlign="center">Profile</DialogTitle>
            <DialogContent sx={style_dialogContent}>
                <ProfileForm data={data} />
            </DialogContent>
        </Dialog >
    )
}

export default Profile


const style_dialogContent = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    pt: 1,
    px: 10,
    width: 450,
    '&::-webkit-scrollbar': {
        width: 0,
    },
}