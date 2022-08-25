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
    bgcolor: "#eeeeee",
    border: "1px solid #b4b4b4",
    borderRadius: 3,
    mt: 2,
    px: 2,
    pt: 1,
    pb: 1.5

}