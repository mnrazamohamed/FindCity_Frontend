import { experimental_sx as sx } from "@mui/material"

export const MuiCard = {
    "styleOverrides": {
        root: sx({
            borderColor: "border",
            borderWidth: "0.5px",
            borderStyle: "solid",
            '& .MuiCardMedia-root': {
                textDecoration: "none",
                color: "background.mainbg",
                borderBottom: "2px solid #525151"
            },
            "& .availability": {
                width: 87,
                height: 26,
                display: "inline-flex",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px 0 0 0",
                transform: " translate(121.5px, -28px)",
                ".MuiTypography-root": {
                    color: "white",
                    fontSize: 10,
                    fontWeight: 500,
                    ml: 0.5,
                    mt: 0.5
                },
            },
        })
    }
}