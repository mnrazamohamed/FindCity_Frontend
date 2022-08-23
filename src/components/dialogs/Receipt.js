import { Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import Table from '../core/Table';

const Receipt = () => {
  const { status, data } = useSelector(state => state.dialog.receipt)
  const dispatch = useDispatch()

  const rows = {
    info: [
      { name: "Cutomer ID", value: data.customerID, },
      { name: "Cutomer Name", value: data.customerName, },
      { name: "Post ID", value: data.postID, },
    ],
    billing: [
      { name: "Paid date", value: data.paidDate, },
      { name: "Invoice ID", value: data.invoiceID, },
      { name: "Amount", value: data.amount, },
    ]
  }


  return (
    <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("receipt")) }} fullWidth>
      <DialogTitle fontWeight={700} fontSize={22}> Receipt </DialogTitle>
      <DialogContent>
        {rows.info.map((row, i) => <Table
          key={i}
          name={row.name}
          value={row.value}
          fcwidth={130}
          fontSize={18}
        />)}
        <Divider sx={{ my: 2, bgcolor: "background.mainbg" }} />
        <Typography component="p" color="text.main" fontWeight={1000} fontSize={18} my={1}>Billing Details</Typography>
        {rows.billing.map((row, i) => <Table
          key={i}
          name={row.name}
          value={row.value}
          fcwidth={130}
          fontSize={18}
        />)}
      </DialogContent>
    </Dialog>
  );
}

export default Receipt