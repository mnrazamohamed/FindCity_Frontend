import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { loginUser } from '../../services/user';
import BtnPrimary from '../core/BtnPrimary';
import TextBox from '../core/TextBox';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [msg,setMsg] = useState({variant : "",msg : "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let initVals = {
        email: "",
        password: ""
    }

    const Schema = yup.object().shape({
        email: yup.string().required("Required*").email("Email must be in valid format"),
        password: yup.string().required("Required*"),
    })

    const renderData = [
        { name: "Email", value: "email", placeholder: "example@example.com", options: { type: "email" } },
        { name: "Password", value: "password", placeholder: "password", options: { type: "password" } },
    ]

    const onSubmit = async ({ email, password }) => {
        const sendData = { email, password }
        const { data, status } = await loginUser(sendData)

        if (status !== 200) {
            setMsg({variant : "red",msg : data})
            return
        }
        
        const authData = {
            role: data.user.role,
            userID: data.user._id,
            token: data.token,
            email: data.user.email,
        }
        dispatch(authActions.set(authData))
        setMsg({variant : "green",msg : "Login Succeed"})
        navigate(`/${data.user.role}/home`)

    }


    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })


    return (

        <form onSubmit={formik.handleSubmit}>

            <Box sx={{ display: "flex", flexDirection: "column", alignSelf: "center", width: 300, }}>

                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={1} width={"100%"} >
                            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                            <TextBox data={data} formik={formik} />
                        </Box>
                    )
                })}

                <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{mt:1}} >{msg.msg}</Typography>
                <BtnPrimary name="Login" type="submit" />

            </Box >

        </form>

    )
}

export default Login
