import { experimental_sx as sx } from "@mui/material"

export const MuiTextField = {
    "styleOverrides": {
        root: sx({
            ".MuiOutlinedInput-root": {
                borderColor: "border",
                borderRadius: 0.3,
            },
          
        })
    }
}