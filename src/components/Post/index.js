import { Box } from '@mui/material';
import React from 'react';
import PostBtn from './PostBtn';
import PostContent from './PostContent';

const Post = ({ data: { date, life, tableValues, id, request, data }, btnVisibible = true }) => {
    return (
        <Box sx={box_style}>
            <PostContent life={life} date={date} tableValues={tableValues} />
            {btnVisibible && < PostBtn postID={id} request={request} data={data} date={date} />}
        </Box >
    )
}

export default Post

const box_style = {
    display: "flex",
    flexDirection: "column",
    width: 600,
    mx: "auto",
    bgcolor: "white",
    border: "1px solid #CED0D3",
    borderRadius: 1.5,
    mt: 2,
    px: 2,
    pt: 1,
    pb: 2.5,
    boxShadow: 2
  
}