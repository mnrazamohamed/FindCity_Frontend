import { Button } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from 'react'
import { USD_LKR } from '../services/payment';

const StripePayment = ({ onClick, btnName, sx, disabled }) => {
    const [amount, setAmount] = useState(undefined)
    useEffect(() => {
        (async () => {
            setAmount(await USD_LKR(1))
        })()
    }, [amount])

    if (amount)
        return (
            <StripeCheckout
                token={onClick}
                amount={amount * 100}
                currency="LKR"
                stripeKey={"pk_test_51LRjpzIfPKKnOIcnIqq2ZWHvkCrrR56htq19UvE4LosUG2cM45cPbirxC6fjpF6Q8UTziAe7gveomqFDarBxOomO00OCfkBC0o"}>
                <Button
                    variant='contained'
                    size="small"
                    disabled={disabled}
                    sx={{ width: 150, mr: 2, ...sx }}>
                    {btnName}
                </Button>
            </StripeCheckout>
        )
}

export default StripePayment

