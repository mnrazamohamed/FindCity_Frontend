import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardingDetailsComp from '../components/boardingDetails';
import BtnPrimary from '../components/core/BtnPrimary';
import { deleteBoarding, getBoarding_boardingID, getBoarding_userID } from '../services/boarding';
import { getUser } from '../services/user';
import { dialogActions } from '../store/dialogSlice';
import { forceUpdateAction } from '../store/forceUpdateSlice';
import { messageActions } from '../store/messageSlice';

const MyBoarding = ({ boardingID = undefined }) => {
  const auth = useSelector(state => state.auth)
  const [boarding, SetBoarding] = useState(undefined)
  const [loading, SetLoading] = useState(true)
  const dispatch = useDispatch()
  const forceUpdate = useSelector(state => state.forceUpdate.boarding)

  const loadData = async () => {
    SetLoading(true)
    if (boardingID) {
      var { data: { boarding }, status: boardingStatus } = await getBoarding_boardingID(boardingID)
      var { data: { user } } = await getUser(boarding.userID)
    } else {
      // eslint-disable-next-line
      var { data: { boarding }, status: boardingStatus } = await getBoarding_userID(auth.userID)
      if (boardingStatus === 404) {
        SetLoading(false)
        SetBoarding(undefined)
        return
      }
      // eslint-disable-next-line
      var { data: { user } } = await getUser(auth.userID)
    }

    const details = {
      data: boarding,
      id: boarding._id,
      name: boarding.boardingName,
      geoloc: boarding.geoLocation,
      images: boarding.image,
      availability: boarding.available,
      facilities: boarding.facilities,
      rows: [
        { name: 'Owner Name', value: user.fullName },
        { name: 'Address', value: boarding.address },
        { name: 'Gender', value: boarding.gender },
        { name: 'Room Type', value: boarding.roomType },
        { name: 'Room Count', value: boarding.rooms },
        { name: 'Washroom Count', value: boarding.washroom },
        { name: 'Contact', value: "+94 " + user.mobile },
      ],
    }
    SetBoarding(details)
    SetLoading(false)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [forceUpdate])



  const onDelete = async () => {
    const response = await deleteBoarding(boarding.id)
    if (response.status !== 200)
      dispatch(messageActions.show({ msg: "Error on boarding delettion", variant: "error" }))
    else {
      dispatch(forceUpdateAction.update('boarding'))
      dispatch(messageActions.show({ msg: "boarding deleted successfully" }))
      dispatch(dialogActions.hide('delete'))
    }
  }

  const handleDelete = () => {
    dispatch(dialogActions.show({
      name: "confirmation",
      onSubmit: onDelete,
      data: "Are you sure do you want to delete your boarding?"
    }))
  }

  const handleCreateBoarding = () => {
    dispatch(dialogActions.show({ name: "boardingForm" }))
  }

  const handleUpdateBoarding = () => {
    dispatch(dialogActions.show({ name: "boardingForm", data: boarding.data }))
  }

  if (loading)
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height={"90vh"} width="100%">
        <Typography variant="h5" fontWeight={900}>Loading...</Typography>
      </Box>
    )

  if (!boarding)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={"90vh"} width="100%">
        <Typography variant="h5" fontWeight={900}>You have not created boading yet :(</Typography>
        <BtnPrimary name="Create Boarding" onClick={handleCreateBoarding} />
      </Box>
    )

  return (
    <Box display="flex" flexDirection="column" m="auto" p={2}>
      <BoardingDetailsComp data={boarding} />
      {auth.role === "manager" && (
        <Box display="flex" justifyContent="end" mr={65}>
          <BtnPrimary size="medium" sx={{ width: 150, mr: 2 }} name="Edit" onClick={handleUpdateBoarding} />
          <BtnPrimary size="medium" sx={{ width: 150 }} name="Delete" onClick={handleDelete} />
        </Box>
      )}
    </Box>
  )
}

export default MyBoarding
