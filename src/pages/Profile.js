import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BtnPrimary from '../components/core/BtnPrimary';
import { deleteUser, getUser } from '../services/user';
import { authActions } from '../store/authSlice';
import { dialogActions } from '../store/dialogSlice';
import { messageActions } from '../store/messageSlice';

const Profile = ({ userDefault }) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const forceUpdate = useSelector(state => state.forceUpdate.user)
  const [user, setUser] = useState(userDefault)

  var navigate = useNavigate()

  useEffect(() => {
    if (!userDefault)
      (async () => {
        const { data: { user } } = await getUser(auth.userID)
        setUser({
          data: user,
          avatar: user.image,
          name: user.fullName,
          address: user.address ?? "Not given",
          mobile: user.mobile,
          email: user.email,
          nic: user.nic,
        })
      })()
  }, [auth.userID, forceUpdate])


  const onDelete = async () => {
    const response = await deleteUser(auth.userID)
    if (response.status !== 200)
      dispatch(messageActions.show({ msg: "Error on user delettion", variant: "error" }))
    else {
      dispatch(messageActions.show({ msg: "account deleted successfully" }))
      dispatch(dialogActions.hide('delete'))
      navigate("/", { replace: true });
      dispatch(authActions.reset())
    }
  }

  const handleDelete = () => {
    dispatch(dialogActions.show({
      name: "confirmation",
      onSubmit: onDelete,
      data: "Are you sure do you want to delete your profile?"
    }))
  }

  const handleUpdate = () => {
    dispatch(dialogActions.show({
      name: "profile",
      data: user.data
    }))
  }

  const handleChangePassword = () => {
    dispatch(dialogActions.show({ name: "OTP" }))
  }

  if (!user) return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="70vh">
      <Typography fontSize={22} textAlign="center" fontWeight={900}>Loading...</Typography>
    </Box>
  )

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width={"100%"} height={userDefault ? 500 : "80vh"} justifyContent="center" >
      <Avatar
        sx={{ width: 200, height: 200 }}
        alt="Profile picture"
        src={user.avatar} />
      <Typography fontSize={16} fontWeight={700} sx={{ my: 2 }}>{user.name}</Typography>

      <Box my={2}>
        <Box display="flex" alignItems="center" mt={1} >
          <LocalPhoneIcon />
          <Typography fontSize={16} sx={{ ml: 1 }}>{user.mobile}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} >
          <EmailIcon />
          <Typography fontSize={16} sx={{ ml: 1 }}>{user.email}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} >
          <BrandingWatermarkIcon />
          <Typography fontSize={16} sx={{ ml: 1 }}>{user.nic}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} >
          <LocationOnIcon />
          <Typography fontSize={16} sx={{ ml: 1 }}>{user.address ?? "Not given"}</Typography>
        </Box>
      </Box>

      {!userDefault && (
        <Box my={5}>
          <BtnPrimary size="small" name="Update" type="button" sx={{ ...buttonStyle, "&:hover": { bgcolor: "primary.main" } }} onClick={handleUpdate} />
          <BtnPrimary size="small" name="Change Password" type="button" sx={{ ...buttonStyle, "&:hover": { bgcolor: "primary.main" } }} onClick={handleChangePassword} />
          <BtnPrimary size="small" name="Delete" type="button" sx={{ ...buttonStyle, "&:hover": { bgcolor: "red" } }} onClick={handleDelete} />
        </Box>
      )}

    </Box>
  )
}

export default Profile

const buttonStyle = {
  width: 150,
  borderRadius: 0.2,
  bgcolor: "background.mainbg",
  color: "white",
  mx: 1
}