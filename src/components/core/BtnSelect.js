import { Button, ButtonGroup } from '@mui/material'
import React, { useState } from 'react'

const BtnSelect = ({ data, sx, formik }) => {
    // eslint-disable-next-line
    const [triger, setTrigger] = useState()


    const handleClick = (e, v) => {
        formik.values[data.value] = e.target.value

        data.items = data.items.map(item => {
            let temp = {}
            if (item.name === e.target.innerText) temp = { select: true, ...item, style: style_btn_selected }
            else temp = { select: false, ...item, style: style_btn }
            return temp
        })
        setTrigger(Math.random())
    }

    return (
        <ButtonGroup size="small" sx={{ width: "100%", border: formik.touched[data.value] && Boolean(formik.errors[data.value]) ? "1px solid red" : "" }}>
            {data.items.map((item, i) => <Button
                key={i}
                size="small"
                variant='containted'
                onClick={handleClick}
                onBlur={formik.handleBlur}
                value={item.value}
                sx={item?.select ? { ...style_btn, ...item.style, ...sx } : { ...style_btn, ...item.style, ...sx, }} >
                {item.name}
            </Button>)}
        </ButtonGroup>)
}

export default BtnSelect

const style_btn = { width: "100%", bgcolor: "white", border: "1px solid #b4b4b4" }
const style_btn_selected = {
    width: "100%",
    bgcolor: "secondary.main",
    border: "1px solid #b4b4b4",
    color: "white",
    "&:hover": {
        bgcolor: "secondary.light",

    }
}