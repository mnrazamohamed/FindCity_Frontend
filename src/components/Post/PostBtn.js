import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InboxIcon from '@mui/icons-material/Inbox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoarding_userID } from '../../services/boarding';
import { getPayment } from '../../services/payment';
import { deletePost, updatePost } from '../../services/post';
import { dialogActions } from '../../store/dialogSlice';
import { forceUpdateAction } from '../../store/forceUpdateSlice';
import { messageActions } from '../../store/messageSlice';

const PostBtn = ({ postID, request, date, data }) => {
    const [current, setCurrent] = useState("")
    const auth = useSelector(state => state.auth)

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        let currentPage = location.pathname.split('/').filter(x => x)
        currentPage = currentPage[currentPage.length - 1]
        setCurrent(currentPage)


    }, [location.pathname])

    const handleNotify = async () => {
        var { data: { boarding }, status: boardingStatus } = await getBoarding_userID(auth.userID)
        if (boardingStatus !== 404) {
            var { status } = await updatePost(auth.userID, postID, { request: [...request, boarding._id] })
            if (status !== 200) {
                dispatch(messageActions.show({ msg: "Error on notify request", variant: "error" }))
                return
            }
            dispatch(messageActions.show({ msg: "Notify request has been added successfully" }))
            return
        }
        dispatch(messageActions.show({ msg: "You didn't own a boarding yet. Create a boarding to notify a post", variant: "info" }))
        dispatch(dialogActions.show({ name: "boardingForm" }))

    }

    const handleDelete = async () => {
        dispatch(dialogActions.show({
            name: "confirmation",
            onSubmit: async () => {
                var { status } = await deletePost(auth.userID, postID)
                if (status !== 200) {
                    dispatch(messageActions.show({ msg: "Error on notify request", variant: "error" }))
                    return
                }
                dispatch(messageActions.show({ msg: "Post deleted successfully" }))
                dispatch(forceUpdateAction.update('post'))
            },
            data: "Are you sure do you want to delete this post?"
        }))
    }

    const handleEdit = async () => dispatch(dialogActions.show({ name: 'post', data: data }))
    const handleRequest = async () => navigate(`${postID}/request`)

    const handleReceipt = async () => {
        console.log(data);
        const { data: { payment } } = await getPayment(data._id)
        const recepitData = {
            customerID: data.userID,
            postID: data._id,
            customerName: data.name,
            paidDate: date,
            invoiceID: payment._id,
            amount: payment.amount + " LKR",
        }
        dispatch(dialogActions.show({ name: 'receipt', data: recepitData }))
    }

    return (
        <>
            {auth.role === "hosteler" && current.toLowerCase() === "mypost" && (
                <Box display="flex" mt={0} alignItems="center" justifyContent="end">
                    <Tooltip PopperProps={PopperProps} title="Requests"><IconButton onClick={handleRequest}><InboxIcon /></IconButton></Tooltip>
                    <Tooltip PopperProps={PopperProps} title="Receipt"><IconButton onClick={handleReceipt}><ReceiptIcon /></IconButton></Tooltip>
                    <Tooltip PopperProps={PopperProps} title="Edit"><IconButton onClick={handleEdit}><EditIcon /></IconButton></Tooltip>
                    {(auth.role === "admin" || auth.role === "hosteler") && (
                        <Tooltip PopperProps={PopperProps} title="Delete"><IconButton onClick={handleDelete}><DeleteIcon /></IconButton></Tooltip>
                    )}
                </Box>
            )}

            {auth.role === "manager" && (
                <Stack display="flex" justifyContent="flex-end" flexDirection="row" my={1}>
                    <Tooltip PopperProps={PopperProps} title="Notify">
                        <IconButton onClick={handleNotify} ><NotificationsActiveIcon /></IconButton>
                    </Tooltip>
                </Stack>
            )}

            {auth.role === "admin" && (
                <Stack display="flex" justifyContent="flex-end" flexDirection="row" my={1}>
                    <Tooltip PopperProps={PopperProps} title="Delete"><IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
                    </Tooltip>
                </Stack>
            )}

        </>)
}

export default PostBtn

const PopperProps = {
    sx: {
        my: 0,
        py: 0,
        "& .MuiTooltip-tooltip": {
            width: 65,
            textAlign: "center",
            borderRadius: 0.3,
        }
    }
}