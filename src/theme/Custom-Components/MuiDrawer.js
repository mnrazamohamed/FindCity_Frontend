import { experimental_sx as sx } from "@mui/material"


export const MuiDrawer = {
    "styleOverrides": {
        root: sx({
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            '& .MuiDrawer-paper': {
                backgroundColor: "background.mainbg"
            },
            '& .MuiTypography-root': {
                color: "white",
                textDecoration: "none"
            },
            '& a': {
                textDecoration: "none",
                color: "background.mainbg"
            },
            '& .MuiListItemButton-root': {
                mx: 0,
                px: 1,
                transition: "background 0.3s, color 0.3s",
            },
            '& .MuiListItemButton-root:hover .MuiSvgIcon-root': {
                backgroundColor: "primary.main",
                px: 1,
                color: "white"
            },
            '& .MuiSvgIcon-root': {
                transition: "background 0.3s, color 0.3s",
                boxSizing: "unset",
                backgroundColor: "background.secondarybg",
                p: 1,
                borderRadius: 0.3,
                color: "white"

            }
        })
    }
}