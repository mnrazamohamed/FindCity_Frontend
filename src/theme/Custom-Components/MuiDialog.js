import { experimental_sx as sx } from "@mui/material"

export const MuiDialog = {
    "styleOverrides": {
        root: sx({
            bgcolor:"rgb(0,0,0,0.5)",
            "& .MuiDialog-paper": {
                p: 2
            },
            "& .MuiDialogActions-root": {
                "& .MuiButton-root":{
                    width: 100,
                    bgcolor: "background.mainbg",
                    color: "white",
                    "&:hover": {
                        bgcolor: "secondary.light"
                    }
                }
            }
        })
    }
}