import { Dialog, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import PostForm from '../form/Post';

const Post = () => {
  const { status, data } = useSelector(state => state.dialog.post)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={status} onClose={() => { dispatch(dialogActions.hide("post")) }} sx={style_dialog}>
      <Typography fontWeight={700} fontSize={34} sx={{ mt: 3, mb: 1 }} textAlign="center">{data ? "Update Post" : "Create Post"}</Typography>
      <PostForm data={data} />
    </Dialog >
  )
}

export default Post

const style_dialog = {
  "& .MuiPaper-root": { px: 2, bgcolor: "#f8f8f8" }
}