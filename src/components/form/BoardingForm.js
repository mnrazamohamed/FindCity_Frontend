import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Checkbox, IconButton, Popper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import defaultImage from '../../localData/image/default_image.jpg';
import { store } from "../../store";
import Map from '../boardingDetails/Map';
import ACSelect from '../core/ACSelect';
import TextBox from '../core/TextBox';
import { useState } from 'react';
import { createBoarding, updateBoarding } from '../../services/boarding';
import { dialogActions } from '../../store/dialogSlice';
import { forceUpdateAction } from '../../store/forceUpdateSlice';
import { mapActions } from '../../store/mapSlice';
import BtnPrimary from '../core/BtnPrimary';

let initVals = {
  boardingName: "",
  gender: "",
  roomCount: "",
  roomType: "",
  washroomCount: "",
  boardingAddress: "",
  geoLocation: "",
  available: "",
  facilities: "",
  boardingImage1: "",
  boardingImage2: "",
  boardingImage3: "",
}

const Schema = yup.object().shape({
  boardingName: yup.string().required("Required*"),
  gender: yup.string().required("Required*"),
  roomCount: yup.string().required("Required*"),
  roomType: yup.string().required("Required*"),
  washroomCount: yup.string().required("Required*"),
  boardingAddress: yup.string().required("Required*"),
  geoLocation: yup.mixed().required("Required*"),
  facilities: yup.mixed().required("Required*"),
  boardingImage1: yup.mixed().required("Required*"),
  boardingImage2: yup.mixed().required("Required*"),
  boardingImage3: yup.mixed().required("Required*"),
})

const BoardingForm = ({ boardingData }) => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [msg, setMsg] = useState({ variant: "", msg: "" })
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMap, setOpenMap] = useState(false);

  const onSubmit = async (data) => {
    setMsg({ variant: "#0a45a3", msg: "" })

    if (!boardingData) data.available = data.available.length === 0 ? false : true
    data.image = [data.boardingImage1, data.boardingImage2, data.boardingImage3]

    try {
      const formData = new FormData()
      formData.append("boardingName", data.boardingName)
      formData.append("gender", data.gender)
      formData.append("rooms", data.roomCount)
      formData.append("roomType", data.roomType)
      formData.append("washroom", data.washroomCount)
      formData.append("address", data.boardingAddress)
      data.image.forEach(data => formData.append("image", data))
      data.geoLocation.forEach(data => formData.append("geoLocation", data))
      formData.append("available", data.available)
      formData.append("facilities", data.facilities)
      
      formData.append("approval", false)
      formData.append("imageFolder", "boarding")
      formData.append("userID", auth.userID)

      //update
      if (boardingData) {
        setMsg({ variant: "#0a45a3", msg: "Boarding update request has been send. Please wait..." })
        formData.append("boardingID", boardingData._id)
        setMsg({ variant: "#0a45a3", msg: "Boarding update request has been send" })
        const { data, status } = await updateBoarding(boardingData._id, formData)
        if (status !== 200) {
          console.log(data);
          setMsg({ variant: "red", msg: "Error on updation. try again" })
        }
        setMsg({ variant: "green", msg: "Boarding updated successfully" })
      }

      //create boarding
      if (!boardingData) {
        setMsg({ variant: "#0a45a3", msg: "Boarding create request has been send. Please wait..." })
        const { data, status } = await createBoarding(formData)
        if (status !== 201) {
          console.log(data);
          setMsg({ variant: "red", msg: "Error on registration. try again" })
          return
        }
        setMsg({ variant: "green", msg: "Boarding created successfully" })
      }

      dispatch(forceUpdateAction.update('boarding'))
      dispatch(dialogActions.hide('boardingForm'))

    } catch (error) {
      console.log(error.message);
    }
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  const loadData = async () => {
    dispatch(mapActions.reset())
    if (boardingData) {
      const position = { lat: boardingData.geoLocation[1], lng: boardingData.geoLocation[0] }
      dispatch(mapActions.set(position))

      formik.values.boardingName = boardingData.boardingName
      formik.values.gender = boardingData.gender
      formik.values.roomCount = boardingData.rooms
      formik.values.roomType = boardingData.roomType
      formik.values.washroomCount = boardingData.washroom
      formik.values.boardingAddress = boardingData.address
      formik.values.geoLocation = boardingData.geoLocation
      formik.values.available = boardingData.available
      formik.values.facilities = boardingData.facilities
      formik.values.boardingImage1 = boardingData.image[0]
      formik.values.boardingImage2 = boardingData.image[1]
      formik.values.boardingImage3 = boardingData.image[2]

    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [boardingData])

  const renderData = [
    {
      name: "Boarding Name",
      placeholder: "Boarding Name",
      value: "boardingName",
      options: {
        defaultValue: boardingData?.boardingName
      }
    },
    {
      name: "Boarding Address",
      placeholder: "Boarding Address",
      value: "boardingAddress",
      options: {
        defaultValue: boardingData?.address
      }
    },
    {
      name: "Room Count ",
      placeholder: "Room Count",
      value: "roomCount",
      options: {
        type: "number",
        defaultValue: boardingData?.rooms
      }
    },
    {
      name: "Washroom Count ",
      placeholder: "Washroom Count",
      value: "washroomCount",
      options: {
        type: "number",
        defaultValue: boardingData?.washroom
      }
    },
  ];

  const [images, setImages] = useState({
    boardingImage1: boardingData ? boardingData.image[0] : defaultImage,
    boardingImage2: boardingData ? boardingData.image[1] : defaultImage,
    boardingImage3: boardingData ? boardingData.image[2] : defaultImage,
  })

  const genderList = {
    name: "Gender",
    value: "gender",
    defaultValue: boardingData?.gender,
    list: [
      { name: "Male", value: "Male" },
      { name: "Female", value: "Female" }
    ]
  }

  const facilityList = {
    name: "Facilities",
    value: "facilities",
    defaultValue: boardingData?.facilities,
    list: [
      { name: "Table", value: "Table" },
      { name: "Chair", value: "Chair" },
      { name: "Bed", value: "Bed" },
      { name: "Fan", value: "Fan" },
      { name: "Mattress", value: "Mattress" },
    ]
  }

  const roomTypeList = {
    name: "Room Type",
    value: "roomType",
    defaultValue: boardingData?.roomType,
    list: [
      { name: "Single", value: "Single" },
      { name: "Share", value: "Share" },
      { name: "Single/share", value: "Single/Share" },
    ]
  }

  const renderImages = [
    { name: "boardingImage1", alt: "boarding image" },
    { name: "boardingImage2", alt: "boarding image" },
    { name: "boardingImage3", alt: "boarding image" },
  ]

  const handleMapClick = () => {
    const { position } = store.getState().map
    if (position.lng && position.lat) {
      formik.values.geoLocation = [position.lng, position.lat]
      setAnchorEl(null);
      setOpenMap(false)
    }
  };

  const onImageChange = (e) => {
    formik.values[e.target.name] = e.target.files[0]
    const image = URL.createObjectURL(e.target.files[0])
    setImages({ ...images, [e.target.name]: image })
  }

  const open = openMap && Boolean(anchorEl);

  return (

    <form onSubmit={formik.handleSubmit}>

      {renderData.map((data, i) => {
        return (
          <Box key={i} mb={2} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
            <TextBox data={data} formik={formik} />
          </Box>
        )
      })}
      <ACSelect data={genderList} formik={formik} />
      <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5, mt: 2 }} >Boarding Images</Typography>
      <Box display="flex" justifyContent="space-between" width={500} mb={2}>
        {renderImages.map((image, i) => {
          return (
            <Button key={i} variant="text" component="label" size="small" sx={{ p: 0 }} >
              <Box component="img" src={images[image.name]} alt={image.alt} width={4 * 40} height={3 * 40} sx={{ objectFit: "cover" }} border={Boolean(formik.errors[image.name]) && "1px solid red"} borderRadius={2} />
              <input hidden accept="image/*" multiple type="file" name={image.name} onChange={onImageChange} />
            </Button>
          )
        })}
      </Box>

      <ACSelect data={roomTypeList} formik={formik} />
      <ACSelect data={facilityList} formik={formik} multiple={true} />

      <Box display="flex" alignItems="center" sx={{ mb: 0.3, ml: 1.5, mt: 1 }}>
        <Typography fontWeight={700} fontSize={14}>Available</Typography>
        <Checkbox
          name='available'
          defaultChecked={boardingData?.available}
          onChange={formik.handleChange}
          sx={{ color: formik.touched.available && Boolean(formik.errors.available) ? "red" : "inherit" }}
        />
      </Box>


      <> {/*Map */}
        <Box display="flex" alignItems="center" mt={1}>
          <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >Map</Typography>
          <IconButton
            size='small'
            onClick={(event) => { setAnchorEl(event.currentTarget); setOpenMap(!openMap) }}
            sx={{
              ml: 2,
              bgcolor: "background.default",
              border: Boolean(formik.errors.geoLocation) ? "1px solid red" : "1px solid #B4B4B4"
            }}>
            <LocationOnIcon />
          </IconButton>
        </Box>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={"right"}
          sx={{ zIndex: 5000 }}>
          <Box sx={{ border: 1, ml: 1, bgcolor: 'background.paper', borderRadius: 2.5 }}>
            {boardingData ?
              <Map
                drag={true} mt={0}
                lat={Number.parseFloat(boardingData.geoLocation[1])}
                lng={Number.parseFloat(boardingData.geoLocation[0])} /> :
              <Map drag={true} mt={0} />
            }
            <Box display="flex" justifyContent="end">
              <BtnPrimary name="Select" size="small" type="button" onClick={handleMapClick} sx={{ width: 80, mr: 1, mb: 1 }} />
            </Box>
          </Box>
        </Popper>
      </>

      <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{ mt: 3 }} >{msg.msg}</Typography>

      <Box display="flex" justifyContent="end">
        <BtnPrimary name={boardingData ? "Update" : "Register"} size="small" type="submit" sx={{ width: 120, my: 1 }} />
      </Box>
    </form>

  )
}

export default BoardingForm