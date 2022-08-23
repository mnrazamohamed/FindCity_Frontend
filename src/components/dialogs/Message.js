import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageActions } from '../../store/messageSlice'

const Message = () => {

    const { msg, status, variant } = useSelector(state => state.message)
    const dispatch = useDispatch()

    return (
        <Snackbar
            TransitionComponent={props => <Slide  {...props} direction="down" />}
            open={status}
            sx={{ minWidth: 300 }}
            autoHideDuration={2500}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => dispatch(messageActions.hide())} >
            <Alert variant='filled' severity={variant} sx={{ width: '100%', borderRadius:0.2, boxShadow:10, mt:1}}>
                {msg}
            </Alert>
        </Snackbar >
    )
}

export default Message