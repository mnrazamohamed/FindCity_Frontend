import { Box, ButtonGroup, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnPrimary from '../components/core/BtnPrimary';
import { deleteBoarding, getBoardings, updateBoarding } from '../services/boarding';
import { deletePost, getPosts, updatePost } from '../services/post';
import { getUser } from '../services/user';
import { dialogActions } from '../store/dialogSlice';
import { forceUpdateAction } from '../store/forceUpdateSlice';
import { messageActions } from '../store/messageSlice';

const Verification = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [posts, setPosts] = useState(undefined)
  const [boardings, setBoardings] = useState(undefined)
  const [contentType, setContentType] = useState(undefined)
  const forceUpdate = useSelector(state => state.forceUpdate.verification)

  const handleContentTypeClick = e => {
    if (contentType === "Boarding") setBoardings(undefined)
    if (contentType === "Post") setPosts(undefined)
    setContentType(e.target.innerText)
  }

  const formatAMPM = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const handleViewClick = ({ data }) => {
    // view boarding
    if (contentType === "Boarding") {
      dispatch(dialogActions.show({
        name: "boardingDetails",
        data: data._id
      }))
    }
    // view post
    if (contentType === "Post") {
      const date = new Date(data.createdAt)
      const temp = {
        data: data,
        id: data._id,
        life: data.life,
        request: data.request,
        date: `${date.toLocaleDateString('en-GB').replaceAll('/', '.')} | ${formatAMPM(date)}`,
        tableValues: [
          { name: "Name", value: data.name },
          { name: "Hometown", value: data.from },
          { name: "Gender", value: data.gender },
          { name: "Price range", value: data.priceRange },
          { name: "Room location", value: data.roomLocation },
          { name: "Room type ", value: data.roomType },
        ]
      }
      dispatch(dialogActions.show({
        name: "postDetatils",
        data: temp
      }))
    }

  }

  const handleDeleteClick = ({ data }) => {
    dispatch(dialogActions.show({
      name: "confirmation",
      onSubmit: async () => {
        let response = undefined
        if (contentType === "Post") response = await deletePost(auth.userID, data._id)
        if (contentType === "Boarding") response = await deleteBoarding(data._id)
        if (response.status !== 200)
          dispatch(messageActions.show({ msg: "Error on user deletion", variant: "error" }))
        else {
          dispatch(forceUpdateAction.update("verification"))
          dispatch(messageActions.show({ msg: `${contentType} deleted successfully` }))
          dispatch(dialogActions.hide('delete'))
        }
      },
      data: `Are you sure do you want to delete this ${contentType.toLowerCase()}?`
    }))
  }

  const handleApproveClick = async ({ data }) => {
    if (contentType === "Post") {
      const { status } = await updatePost(auth.userID, data._id, { approval: true })
      if (status !== 200) {
        dispatch(messageActions.show({ msg: "Error on post approval", variant: "error" }))
        return
      }
      dispatch(messageActions.show({ msg: "Post approval succeed" }))
    }
    if (contentType === "Boarding") {
      const { status } = await updateBoarding(data._id, { approval: true })
      if (status !== 200) {
        dispatch(messageActions.show({ msg: "Error on boarding approval", variant: "error" }))
        return
      }
      dispatch(messageActions.show({ msg: "Boarding approval succeed" }))
    }
    dispatch(forceUpdateAction.update("verification"))
  }

  const loadData = async () => {
    if (contentType === "Post") {
      let { data: { post } } = await getPosts()
      post = post.filter(p => !p.approval)
      const temp = []
      for (const p of post) {
        const { data: { user } } = await getUser(p.userID)
        temp.push({
          id: p._id,
          username: user?.fullName,
          postuser: p.name,
          location: p.roomLocation,
          data: p
        })
      }
      setPosts(temp)
    }

    if (contentType === "Boarding") {
      let { data: { boarding } } = await getBoardings(auth.userID)
      boarding = boarding.filter(b => !b.approval)
      const temp = []
      for (const b of boarding) {
        const { data: { user } } = await getUser(b.userID)
        temp.push({
          id: b._id,
          username: user?.fullName,
          boardingname: b.boardingName,
          available: b.available,
          data: b
        })
      }
      setBoardings(temp)
    }

  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [forceUpdate, contentType])

  const columns_post = [
    { field: 'username', headerName: 'User Name', width: 150, align: "center", },
    { field: 'postuser', headerName: 'Post User Name', width: 150, align: "center", },
    { field: 'location', headerName: 'Location', width: 150, align: "center", },
    {
      field: "View",
      headerName: 'View',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_view_style} onClick={() => handleViewClick(row)} name="View" />
    },
    {
      field: "Approve",
      headerName: 'Approve',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_approve_style} onClick={() => handleApproveClick(row)} name="Approve" />
    },
    {
      field: "Delete",
      headerName: 'Delete',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_delete_style} onClick={() => { handleDeleteClick(row) }} name="Delete" />
    },
  ];

  const columns_boarding = [
    { field: 'username', headerName: 'User Name', width: 150, align: "center", },
    { field: 'boardingname', headerName: 'Boarding Name', width: 150, align: "center", },
    { field: 'available', headerName: 'Available', width: 150, align: "center", },
    {
      field: "View",
      headerName: 'View',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_view_style} onClick={() => handleViewClick(row)} name="View" />
    },
    {
      field: "Approve",
      headerName: 'Approve',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_approve_style} onClick={() => handleApproveClick(row)} name="Approve" />
    },
    {
      field: "Delete",
      headerName: 'Delete',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_delete_style} onClick={() => { handleDeleteClick(row) }} name="Delete" />
    },
  ];

  if (!contentType)
    return (
      <Box mx="auto" my={10} textAlign="center">
        <ButtonGroup size="small" >
          <BtnPrimary sx={contentType === "Post" ? btn_group_selected_style : btn_group_style} onClick={handleContentTypeClick} name="Post" />
          <BtnPrimary sx={contentType === "Boarding" ? btn_group_selected_style : btn_group_style} onClick={handleContentTypeClick} name="Boarding" />
        </ButtonGroup>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"60vh"} width={"100%"}>
          <Typography variant="h5" fontWeight={900}>Select content type</Typography>
        </Box>
      </Box>
    )

  if (!posts && !boardings)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"90vh"} width={"100%"}>
        <Typography variant="h5" fontWeight={900}>Loading...</Typography>
      </Box>
    )

  return (
    <Box mx="auto" my={10} textAlign="center">
      <ButtonGroup size="small" >
        <BtnPrimary sx={contentType === "Post" ? btn_group_selected_style : btn_group_style} onClick={handleContentTypeClick} name="Post" />
        <BtnPrimary sx={contentType === "Boarding" ? btn_group_selected_style : btn_group_style} onClick={handleContentTypeClick} name="Boarding" />
      </ButtonGroup>
      <DataGrid
        sx={data_grid_style}
        rows={contentType === "Post" ? posts : boardings}
        columns={contentType === "Post" ? columns_post : columns_boarding}
        autoHeight
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
      />
    </Box>
  )
}

export default Verification

const data_grid_style = {
  ".MuiDataGrid-root .MuiDataGrid-cell:focus-within": { outline: "none!important" },
  width: 850,
  bgcolor: "#e3e1e1",
  borderColor: 'secondary.main',
  ".MuiDataGrid-row": {
    border: '1px solid #b4b4b4',
  },
  ".MuiDataGrid-columnHeaderTitleContainer": {
    justifyContent: "center",
    mr: 1
  },
  mt: 5,
}

const btn_view_style = {
  "&:hover": { bgcolor: "secondary.dark" },
  width: "min-content",
}

const btn_approve_style = {
  bgcolor: "success.main",
  "&:hover": { bgcolor: "success.dark" },
  width: "min-content",
}

const btn_delete_style = {
  bgcolor: "error.main",
  "&:hover": { bgcolor: "error.dark" },
  width: "min-content",
}

const btn_group_style = {
  bgcolor: "#e3e1e1",
  color: "black",
  "&:hover": {
    bgcolor: "primary.dark",
    color: "white",
  },
  border: 0.1,
  borderColor: 'primary.dark',

}

const btn_group_selected_style = {
  bgcolor: "primary.dark",
  color: "white",
  border: 0.1,
  borderColor: 'primary.dark',
}