import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, ButtonGroup, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../services/user';
import { useState } from 'react';
import BtnPrimary from '../components/core/BtnPrimary';
import { dialogActions } from '../store/dialogSlice';
import { messageActions } from '../store/messageSlice';
import { forceUpdateAction } from '../store/forceUpdateSlice';

const Users = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [users, setUsers] = useState(undefined)
  const [userType, setUserType] = useState(undefined)
  const forceUpdate = useSelector(state => state.forceUpdate.users)

  const handleUserTypeClick = e => setUserType(e.target.innerText)

  const handleViewClick = ({ user }) => {
    let temp = { ...user }
    temp.avatar = user.image
    dispatch(dialogActions.show({
      name: "userDetails",
      data: temp
    }))
  }


  const handleDeleteClick = ({ user }) => {
    dispatch(dialogActions.show({
      name: "confirmation",
      onSubmit: async () => {
        const response = await deleteUser(user._id)
        if (response.status !== 200)
          dispatch(messageActions.show({ msg: "Error on user deletion", variant: "error" }))
        else {
          dispatch(forceUpdateAction.update("users"))
          dispatch(messageActions.show({ msg: "profile deleted successfully" }))
          dispatch(dialogActions.hide('delete'))
        }
      },
      data: `Are you sure do you want to delete ${user.fullName} profile?`
    }))
  }

  const loadData = async () => {
    const { data: { user } } = await getUsers(auth.userID)
    setUsers(
      user.map(user => {
        return {
          user: user,
          id: user._id,
          avatar: user.image,
          name: user.fullName,
          nic: user.nic,
          mobile: user.mobile,
          role: user.role
        }
      })
    )
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [forceUpdate])

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: ({ row }) => <Avatar src={row.avatar} alt="profile image" />, width: 150,
      align: "center",
    },
    { field: 'name', headerName: 'Name', width: 150, align: "center", },
    { field: 'nic', headerName: 'NIC', width: 150, align: "center", },
    { field: 'mobile', headerName: 'Mobile', width: 150, align: "center", },
    {
      field: "View",
      headerName: 'View',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_view_style} onClick={() => handleViewClick(row)} name="View" />
    },
    {
      field: "Delete",
      headerName: 'Delete',
      align: "center",
      renderCell: ({ row }) => <BtnPrimary size="small" sx={btn_delete_style} onClick={() => { handleDeleteClick(row) }} disable={row.role === "admin"} name="Delete" />
    },
  ];

  if (!userType)
    return (
      <Box mx="auto" my={10} textAlign="center">
        <ButtonGroup size="small" >
          <BtnPrimary sx={userType === "Admin" ? btn_group_selected_style : btn_group_style} onClick={handleUserTypeClick} name="Admin" />
          <BtnPrimary sx={userType === "Hosteler" ? btn_group_selected_style : btn_group_style} onClick={handleUserTypeClick} name="Hosteler" />
          <BtnPrimary sx={userType === "Manager" ? btn_group_selected_style : btn_group_style} onClick={handleUserTypeClick} name="Manager" />
        </ButtonGroup>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"60vh"} width={"80vw"}>
          <Typography variant="h5" fontWeight={900}>Select user type</Typography>
        </Box>
      </Box>
    )

  if (!users)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"90vh"} width={"80vw"}>
        <Typography variant="h5" fontWeight={900}>Loading...</Typography>
      </Box>
    )

  return (
    <Box mx="auto" my={10} textAlign="center">
      <ButtonGroup size="small" >
        <BtnPrimary sx={userType === "Admin" ? btn_group_selected_style : btn_group_style} onClick={handleUserTypeClick} name="Admin" />
        <BtnPrimary sx={userType === "Hosteler" ? btn_group_selected_style : btn_group_style} onClick={handleUserTypeClick} name="Hosteler" />
        <BtnPrimary sx={userType === "Manager" ? btn_group_selected_style : btn_group_style} onClick={handleUserTypeClick} name="Manager" />
      </ButtonGroup>
      <DataGrid
        sx={data_grid_style}
        rows={users.filter(({ role }) => role === userType.toLowerCase())}
        columns={columns}
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

export default Users

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

