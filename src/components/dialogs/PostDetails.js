import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/index';
import { dialogActions } from '../../store/dialogSlice';

const PostDetatils = () => {

    const dispatch = useDispatch()
    const { status, data } = useSelector(state => state.dialog.postDetatils)

    if (data)
        return (
            <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("postDetatils")) }} maxWidth="md" >
                <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", }}>
                    <Post data={data} btnVisibible={false} />
                </DialogContent>
            </Dialog >
        )
}



export default PostDetatils