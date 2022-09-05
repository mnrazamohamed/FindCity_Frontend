import { Box, Typography } from '@mui/material'
import React from 'react'
import BtnText from '../components/core/btnText'
import LoginForm from '../components/form/Login'
import logo from '../localData/image/findcitylogo.png'
import LoginPic from '../localData/image/Login.jpg'
import { dialogActions } from '../store/dialogSlice';
import { useDispatch } from 'react-redux'

const Login = () => {

    const dispatch = useDispatch()

    const OnClick_CreateAccount = () => dispatch(dialogActions.show({ name: "signup" }))
    const onClick_forgetPassword = () => dispatch(dialogActions.show({ name: "OTP" }))
    

    return (
        <>
            <Box display="flex" p={0} m={0}>

                {/* left image */}
                <Box component="img" src={LoginPic} alt='login Image' width="75%" height="100vh" />

                {/* right box */}
                <Box width="25%" display="flex" flexDirection="column" alignItems="center" >
                    <Box component="img" src={logo} alt='login Image' width={200} height={200} my={10} />

                    <Typography fontWeight={700} fontSize={34} sx={{ my: 2 }} textAlign="center">Login</Typography>
                    <LoginForm />

                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography color="text.main" fontWeight={400} sx={{ mr: 0.2 }}>Not registered yet?</Typography>
                        <BtnText name="Create an Account" onClick={OnClick_CreateAccount} />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                        <BtnText name="Forgot password?" onClick={onClick_forgetPassword} />
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default Login