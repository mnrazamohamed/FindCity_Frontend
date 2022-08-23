import { Avatar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { updateUser } from '../../services/user';
import { dialogActions } from '../../store/dialogSlice';
import { forceUpdateAction } from '../../store/forceUpdateSlice';
import BtnPrimary from '../core/BtnPrimary';
import TextBox from '../core/TextBox';

const initVals = {
    fullName: "",
    nic: "",
    mobile: "",
    address: "",
    image: "",
}

const Schema = yup.object().shape({
    fullName: yup.string().required("Required*"),
    address: yup.string().required("Required*"),
    mobile: yup.string().required("Required*"),
    nic: yup.string().required("Required*"),
    image: yup.mixed().required("Required*"),
})

const Profile = ({ data }) => {
    const [image, setImage] = useState("")
    const auth = useSelector(state => state.auth)
    const [msg, setMsg] = useState({ variant: "", msg: "" })
    const dispatch = useDispatch()

    const onSubmit = async (dataInput) => {

        setMsg({ variant: "#0a45a3", msg: "Profile updated request has sent" })

        const formData = new FormData()
        formData.append("fullName", dataInput.fullName)
        formData.append("address", dataInput.address)
        formData.append("mobile", dataInput.mobile)
        formData.append("nic", dataInput.nic)
        formData.append("imageFolder", "user")
        formData.append("image", dataInput.image)

        const { data: res, status } = await updateUser(auth.userID, formData)
        if (status !== 200) {
            setMsg({ variant: "red", msg: res })
            return
        }

        setMsg({ variant: "green", msg: "Profile updated successfully" })
        dispatch(forceUpdateAction.update('user'))
        dispatch(dialogActions.hide('profile'))

    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    const renderData = [
        { name: "Name", value: "fullName", placeholder: "Full Name", options: { defaultValue: data.fullName } },
        { name: "Address", value: "address", placeholder: "Address", options: { defaultValue: data.address ?? null } },
        { name: "Mobile", value: "mobile", placeholder: "Enter without leading zero", options: { type: "number", defaultValue: data.mobile } },
        { name: "NiC", value: "nic", placeholder: "NIC", options: { defaultValue: data.nic } },
    ];

    const onImageChange = (e) => {
        formik.values.image = e.target.files[0]
        const image = URL.createObjectURL(e.target.files[0])
        setImage(image)
    }

    useEffect(() => {
        formik.values.address = data?.address
        formik.values.image = data?.image
        formik.values.mobile = data?.mobile
        formik.values.fullName = data?.fullName
        formik.values.nic = data?.nic
        setImage(data?.image)
        // eslint-disable-next-line
    }, [data])


    return (
        <form onSubmit={formik.handleSubmit}>

            <Box display="flex" justifyContent="center">
                <IconButton color="primary" component="label" size="small" sx={{ p: 0 }} >
                    <Avatar src={image} sx={{ height: 150, width: 150, border: Boolean(formik.errors.image) && "1px solid red" }} />
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={onImageChange} />
                </IconButton>
            </Box>

            {renderData.map((data, i) => {
                return (
                    <Box key={i} mb={2} width={"100%"} >
                        <Typography fontWeight={500} fontSize={14} sx={{ mb: 0.3, ml: 0.5 }} >{data.name}</Typography>
                        <TextBox data={data} formik={formik} />
                    </Box>
                )
            })}

            <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{ mt: 3 }} >{msg.msg}</Typography>

            <Box display="flex" justifyContent="end">
                <BtnPrimary type="submit" name="Submit" sx={{ width: 100 }} />
            </Box>
        </form>
    )
}

export default Profile
