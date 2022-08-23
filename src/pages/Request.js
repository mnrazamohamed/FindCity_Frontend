import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BtnPrimary from '../components/core/BtnPrimary';
import { getPost, updatePost } from '../services/post';
import { dialogActions } from '../store/dialogSlice';
import { messageActions } from '../store/messageSlice';
import { forceUpdateAction } from '../store/forceUpdateSlice';
import { getBoarding_boardingID } from '../services/boarding';

const Request = () => {
  const dispatch = useDispatch()
  const { postID } = useParams()

  const forcUpdate = useSelector(state => state.forceUpdate.request)
  const auth = useSelector(state => state.auth)

  const [request, SetRequest] = useState(undefined)
  const [post, setPost] = useState(undefined)

  const loadData = async () => {
    const { data: { post } } = await getPost(auth.userID, postID)
    setPost(post)

    const temp = []
    for (const boardingID of post.request) {
      var { status: boardingStatus } = await getBoarding_boardingID(boardingID)
      if (boardingStatus === 200) {
        temp.push({
          id: Math.floor(Math.random() * 100000),
          date: new Date(post.createdAt).toLocaleDateString('en-GB').replaceAll('/', '.'),
          boardingID: boardingID
        })
      }
    }
    SetRequest(temp)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [forcUpdate])

  const handleViewClick = ({ boardingID }) => {
    dispatch(dialogActions.show({ name: "boardingDetails", data: boardingID }))
  }

  const handleDeleteClick = async ({ boardingID }) => {
    dispatch(dialogActions.show({
      name: "confirmation",
      onSubmit: async () => {
        const newRequests = post.request.filter(bid => bid !== boardingID)
        var { status } = await updatePost(auth.userID, postID, { request: newRequests })
        if (status !== 200) {
          dispatch(messageActions.show({ msg: "Error on delete request", variant: "error" }))
          return
        }
        dispatch(messageActions.show({ msg: "Request deleted successfully" }))
        dispatch(forceUpdateAction.update('request'))
      },
      data: "Are you sure do you want to delete this request?"
    }))
  }

  if (!request)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"90vh"} width={"100vw"}>
        <Typography variant="h5" fontWeight={900}>Loading...</Typography>
      </Box>
    )

  const columns = [

    { field: 'date', headerName: 'Date', minWidth: 150, headerAlign: 'center', flex: 1, align: 'center' },
    {
      field: "boardingID",
      headerName: 'Boarding',
      headerAlign: 'center',
      flex: 1,
      minWidth: 150,
      align: 'center',
      renderCell: ({ row }) => <BtnPrimary size="small" sx={{ width: 100 }} onClick={() => { handleViewClick(row) }} name="View" />
    },
    {
      field: "delete",
      headerName: 'Delete',
      headerAlign: 'center',
      flex: 1,
      minWidth: 150,
      align: 'center',
      renderCell: ({ row }) => <BtnPrimary size="small" sx={{ width: 100 }} onClick={() => { handleDeleteClick(row) }} name="Delete" />
    },
  ];


  if (request)
    return (
      <Box mx="auto"  >
        <Typography fontWeight={700} fontSize={32} textAlign="center" sx={{ my: 5 }}>Boarding Requests</Typography>
        <DataGrid
          sx={dataGrid_style}
          rows={request}
          columns={columns}
          autoHeight
        />
      </Box>
    )
}

export default Request

const dataGrid_style = {
  width: 600,
  ".MuiDataGrid-root .MuiDataGrid-cell:focus-within": { outline: "none !important" },
  bgcolor: "#e3e1e1",
  borderColor: 'secondary.main',
  ".MuiDataGrid-row": {
    border: '1px solid #b4b4b4',
  },

}