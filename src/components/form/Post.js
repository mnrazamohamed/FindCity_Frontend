import { Button, DialogContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import StripePayment from '../StripePayment';
import ACSelect from '../core/ACSelect';
import TextBox from '../core/TextBox';
import { createPayment, updatePayment, USD_LKR } from '../../services/payment';
import { creatPost, getPost, updatePost } from '../../services/post';
import { dialogActions } from '../../store/dialogSlice';
import Checkbox from '@mui/material/Checkbox';
import { forceUpdateAction } from '../../store/forceUpdateSlice';

const initVals = {
    name: "",
    from: "",
    gender: "",
    priceRange: "",
    roomLocation: "",
    roomType: "",
    info: false
}

const Schema = yup.object().shape({
    name: yup.string().required("Required*"),
    from: yup.string().required("Required*"),
    roomLocation: yup.string().required("Required*"),
    gender: yup.string().required("Required*"),
    priceRange: yup.string().required("Required*"),
    roomType: yup.string().required("Required*"),
    info: yup.bool().oneOf([true], 'Required*')
})

/**
 * If postData is not undefined then this component will work for update post. 
 * 
 * If postData is undefined then this component will work for create post
 * @param {postData} postData 
 * @returns 
 */

const Post = ({ data: postData }) => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [msg, setMsg] = useState({ variant: "", msg: "" })
    const [submit, setSumbit] = useState(false)
    const [sendData, setSendData] = useState(false)

    const paymentOnClick = async (token) => {

        sendData.stripeToken = token
        sendData.amount = 1 // 1 USD
        sendData.amountLKR = await USD_LKR(1)
        sendData.userID = auth.userID
        sendData.email = auth.email

        setMsg({ variant: "#0a45a3", msg: "Payment request has been sent" })

        // step 1 : create payment
        var { data, status } = await createPayment(sendData)
        if (status !== 201) {
            setMsg({ variant: "red", msg: "Error occured on creating payment" })
            return
        }
        sendData._id = data._id
        setMsg({ variant: "green", msg: "Payment success" })

        setMsg({ variant: "#0a45a3", msg: "Post creation request has been sent" })
        // step 2 : create post
        var { data, status } = await creatPost(sendData)
        if (status !== 201) {
            setMsg({ variant: "red", msg: "Error occuredon creating post. Your payment will be refund" })
            return
        }
        sendData.postID = data._id

        // step 3 : provide post id to created payment record
        var { data, status } = await updatePayment(sendData)
        if (status !== 200) {
            setMsg({ variant: "red", msg: "Error occured" })
            return
        }

        setMsg({ variant: "green", msg: "Post created successfully" })
        dispatch(forceUpdateAction.update('post'))
        dispatch(dialogActions.hide('post'))

    }

    const onSubmit = async (inputData) => {

        const temp = {
            name: inputData.name,
            from: inputData.from,
            gender: inputData.gender,
            priceRange: inputData.priceRange,
            roomLocation: inputData.roomLocation,
            roomType: inputData.roomType,
        }

        if (postData) {
            const { data, status } = await updatePost(auth.userID, postData._id, temp)
            console.log(data);
            if (status !== 200) {
                setMsg({ variant: "red", msg: data })
                return
            }
            setMsg({ variant: "green", msg: "Post updated successfully" })
            dispatch(forceUpdateAction.update('post'))
            dispatch(dialogActions.hide('post'))
            return
        }

        setSumbit(true)
        setSendData(temp)
    }

    const renderData = [
        { name: "Full Name", value: "name", placeholder: "Full Name", options: { defaultValue: postData?.name, } },
        { name: "Home Town", value: "from", placeholder: "Home Town", options: { defaultValue: postData?.from, } },
        { name: "Room Location", value: "roomLocation", placeholder: "Room Location", options: { defaultValue: postData?.roomLocation, } },
    ]

    const renderGender = {
        name: "Gender",
        value: "gender",
        defaultValue: postData?.gender,
        list: [
            { name: "Male", value: "male" },
            { name: "Female", value: "female" }
        ]
    }

    const renderRoomType = {
        name: "Room Type",
        value: "roomType",
        defaultValue: postData?.roomType,
        list: [
            { name: "Single/Share", value: "single/share" },
            { name: "Single", value: "single" },
            { name: "Share", value: "share" }
        ]
    }

    const renderPriceRange = {
        name: "Price Range",
        value: "priceRange",
        defaultValue: postData?.priceRange,
        list: [
            { name: "2500 LKR - 4500 LKR", value: "2500 LKR - 4500 LKR" },
            { name: "4500 LKR - 6500 LKR", value: "4500 LKR - 6500 LKR" },
            { name: "6500 LKR - 8500 LKR", value: "6500 LKR - 8500 LKR" },
            { name: "8500 LKR - 10500 LKR", value: "8500 LKR - 10500 LKR" },
        ]
    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    useEffect(() => {
        if (postData) {
            formik.values.from = postData.from
            formik.values.roomLocation = postData.roomLocation
            formik.values.name = postData.name
            formik.values.gender = postData.gender
            formik.values.roomType = postData.roomType
            formik.values.priceRange = postData.priceRange
        }
    }, [postData])

    return (

        <form onSubmit={formik.handleSubmit}>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 5, width: 420 }}>

                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={1} width={"100%"} >
                            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                            <TextBox data={data} formik={formik} />
                        </Box>
                    )
                })}

                <ACSelect data={renderGender} formik={formik} />
                <ACSelect data={renderRoomType} formik={formik} />
                <ACSelect data={renderPriceRange} formik={formik} />

                <Box display="flex">
                    <Checkbox
                        name='info'
                        onChange={formik.handleChange}
                        sx={{ color: formik.touched.info && Boolean(formik.errors.info) ? "red" : "inherit" }}
                    />

                    <Typography fontWeight={700} fontSize={14} color="orange" textAlign="center" sx={{ my: 1.5 }} >
                        The post automatically will be deleted in {postData?.life ?? 10} days
                    </Typography>
                </Box>

                <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{ mt: 1 }} >{msg.msg}</Typography>

                {!submit && (
                    <Button
                        variant='contained'
                        type="submit"
                        size="small"
                        sx={{ width: 120, alignSelf: "end", color: "white", mt: 0, mb: 1 }}>
                        Submit
                    </Button>
                )}

                {!postData && submit && (
                    <Box display="flex" justifyContent="end">
                        <StripePayment
                            sx={{ width: 120, color: "white", mb: 1, mt: 2, mr: 0 }}
                            onClick={paymentOnClick}
                            btnName="Pay"
                        />
                    </Box>
                )}


            </DialogContent>

        </form>

    )
}


export default Post