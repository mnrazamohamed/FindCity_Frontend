import Receipt from './Receipt'
import React from 'react'
import BoardingDetails from './BoardingDetails'
import Message from './Message'
import OTP from './OTP'
import Post from './Post'
import Signup from './Signup'
import UpdatePassword from './UpdatePassword'
import Confirmation from './Confirmation'
import BoardingForm from './BoardingForm'
import Profile from './Profile'
import UserDetails from './UserDetails'

const index = () => {
  return (
    <>
      <Message />
      <Signup />
      <OTP />
      <UpdatePassword />
      <Post />
      <BoardingDetails />
      <Receipt />
      <Confirmation />
      <BoardingForm />
      <Profile/>
      <UserDetails/>
    </>
  )
}

export default index