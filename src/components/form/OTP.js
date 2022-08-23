import React, { useState } from 'react'
import { dialogActions } from '../../store/dialogSlice'
import BtnSecondary from '../core/BtnSecondary'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, Typography } from '@mui/material'
import TextBox from '../core/TextBox'
import { sendMail } from '../../services/mail'
import { getUser_FP } from '../../services/user'

const OTP = () => {
    const [msg, setMsg] = useState({ variant: "", msg: "" })
    const dispatch = useDispatch()
    const [OTP, setOTP] = useState(undefined)

    const initVals = {
        email: "",
        OTP: "",
    }

    const Schema = yup.object().shape({
        email: yup.string().required("Required*").email("Email must be in valid format"),
        OTP: yup.number(),
    })

    const onSubmit = async (data) => {

        //check user
        const user = await getUser_FP(`${data.email}`)
        if (user.status !== 200) {
            setMsg({ variant: "red", msg: "Invalid email" })
            return
        }

        //prepare email data
        const email_data = {
            to: data.email,
            OTP: Math.floor(Math.random() * 100000)
        };

        // send OTP
        if (!OTP) {
            try {
                const res = await sendMail(email_data)
                if (res === "OK") {
                    setOTP(email_data.OTP)
                    setMsg({ variant: "green", msg: 'Email has been sent successfully' })
                }
                else
                    setMsg({ variant: "red", msg: res })
            } catch (error) {
                setMsg({ variant: "red", msg: error.message })
            }
        }

        //verfy OTP
        if (OTP) {
            if (data.OTP) {
                if (Number.parseInt(data.OTP) !== OTP)
                    setMsg({ variant: "red", msg: "Invalid OTP" })
                else {
                    // eslint-disable-next-line
                    dispatch(dialogActions.show({ name: "UpdatePassword", data: user.data }))
                    dispatch(dialogActions.hide('OTP'))
                }
            } else {
                setMsg({ variant: "red", msg: "OTP required" })
            }
        }

    }

    const renderData = [
        { name: "Email", value: "email", placeholder: "example@example.com", options: { type: "email" } },
        { name: "OTP", value: "OTP", placeholder: "OTP", options: { ype: "number", disabled: OTP ? false : true } },
    ]

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    return (
        <form onSubmit={formik.handleSubmit}>

            {renderData.map((data, i) => {
                if (!OTP && data.name === "OTP") return
                if (OTP && data.name === "Email") return
                return (
                    <Box key={i} mb={1} width={"100%"} >
                        <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                        <TextBox data={data} formik={formik} />
                    </Box>
                )
            })}
            <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{ mt: 3 }} >{msg.msg}</Typography>

            <Box display="flex" justifyContent="end">
                <BtnSecondary type="submit" name={OTP ? "Verify" : "Send"} />
            </Box>

        </form>
    )
}

export default OTP