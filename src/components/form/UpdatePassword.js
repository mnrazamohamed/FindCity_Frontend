import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { dialogActions } from '../../store/dialogSlice';
import { messageActions } from '../../store/messageSlice';
import BtnSecondary from '../core/BtnSecondary';
import TextBox from '../core/TextBox';
import { updatePassword_FP } from '../../services/user';

const initVals = {
  password: "",
  confirmPassword: "",
}

const Schema = yup.object().shape({
  password: yup.string().required("Required*").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$/, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"),
  confirmPassword: yup.string().required("Required*").oneOf([yup.ref('password')], 'Password not match.')
})

const UpdatePassword = ({ userID }) => {
  const dispatch = useDispatch()
  const [msg, setMsg] = useState({ variant: "", msg: "" })

  const onSubmit = async ({ password }) => {

    const updateData = {
      "userID": userID,
      "password": password
    }

    const { data, status } = await updatePassword_FP(updateData)
    if (status !== 200) {
      setMsg({ variant: "red", msg: data })
    }
    else {
      setMsg({ variant: "green", msg: 'Password updated successfully' })
      dispatch(dialogActions.hide("UpdatePassword"))
    }
  }

  const renderData = [
    { name: "Password", value: "password", placeholder: "Password", options: { type: "password" } },
    { name: "Confirm Password", value: "confirmPassword", placeholder: "Confirm password", options: { type: "password" } },
  ]

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      {renderData.map((data, i) => {
        return (
          <Box key={i} mb={1} width={"100%"} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
            <TextBox data={data} formik={formik} />
          </Box>
        )
      })}

      <Typography fontWeight={700} color={msg.variant} fontSize={14} textAlign="center" sx={{ mt: 3 }} >{msg.msg}</Typography>

      <Box display="flex" justifyContent="end">
        <BtnSecondary type="submit" name="Update" />
      </Box>
    </form>
  )
}


export default UpdatePassword