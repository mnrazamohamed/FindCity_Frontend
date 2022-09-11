import { Button, DialogContent, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { singupUser } from '../../services/user';
import { dialogActions } from '../../store/dialogSlice';
import BtnSelect from '../core/BtnSelect';
import TextBox from '../core/TextBox';
import HelpIcon from '@mui/icons-material/Help';
import PopoverRole from '../dialogs/PopoverRole';

const initVals = {
    fullName: "",
    email: "",
    nic: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
}

const Schema = yup.object().shape({
    fullName: yup.string().required("Required*"),
    email: yup.string().required("Required*").email("Email must be in valid format"),
    nic: yup.string().required("Required*").test("len", "Invalid NIC", (val) => {
        if (((val?.length === 10 && isNaN(val[9])) || val?.length === 12)) return true
    }),
    mobile: yup.string().required("Required*").test("len", "Invalid Phone number", (val) => {
        if ((val?.length === 9)) return true
    }),
    role: yup.string().required("Required*"),
    password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/,
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
    confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const renderData = [
    { name: "Full Name", value: "fullName", placeholder: "Full Name" },
    { name: "Email", value: "email", placeholder: "Email", options: { type: "email" } },
    { name: "NIC", value: "nic", placeholder: "NIC", },
    { name: "Mobile", value: "mobile", placeholder: "7X XX XX XXX", options: { type: "number" } },
    { name: "Password", value: "password", placeholder: "Password", options: { type: "password" } },
    { name: "Confrim Password", value: "confirmPassword", placeholder: "Confirm Password", options: { type: "password" } },
]

const renderSelect = {
    name: "Role",
    placeholder: "Role",
    value: "role",
    items: [
        { name: "Manager", value: "manager" },
        { name: "Renter", value: "hosteler" },
    ]
}

const Signup = () => {

    const dispatch = useDispatch()
    const [msg, setMsg] = useState({ variant: "", msg: "" })

    const [helpRoleAnchor, setHelpRoleAnchor] = useState(null);

    const handleHelpRole = (event) => setHelpRoleAnchor(event.currentTarget);


    const onSubmit = async (inputData) => {
        const { data, status } = await singupUser(inputData)
        if (status !== 200) {
            setMsg({ variant: "red", msg: data })
            return
        }

        setMsg({ variant: "green", msg: "Registeration Succeed" })
        dispatch(dialogActions.hide('signup'))

    }

    const formik = useFormik({
        initialValues: initVals,
        onSubmit: onSubmit,
        validationSchema: Schema,
    })

    return (

        <form onSubmit={formik.handleSubmit}>

            <DialogContent sx={{ display: "flex", flexDirection: "column", alignSelf: "center", pt: 1, mx: 5, width: 400 }}>

                {renderData.map((data, i) => {
                    return (
                        <Box key={i} mb={1} width={"100%"} >
                            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                            <TextBox data={data} formik={formik} />
                        </Box>
                    )
                })}

                <Box display="flex" alignItems="center" mb={0.3} ml={1.5}>
                    <Typography fontWeight={700} fontSize={14} >Role</Typography>
                    <IconButton sx={{ p: 0, m: 0, ml: 0.5, mb: 0.5 }} onClick={handleHelpRole}>
                        <HelpIcon fontSize='small' sx={{ color: "primary.main" }} />
                    </IconButton>
                    <PopoverRole anchor={helpRoleAnchor} setAnchor={setHelpRoleAnchor} />
                </Box>
                <BtnSelect data={renderSelect} formik={formik} />

                <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{ mt: 3 }} >{msg.msg}</Typography>

                <Button
                    variant='contained'
                    type="submit"
                    sx={{ width: 180, alignSelf: "center", color: "white", mt: 3, mb: 1 }}>
                    Sign Up
                </Button>


            </DialogContent>

        </form>

    )
}


export default Signup