import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import Table from "../core/Table";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useLocation } from "react-router-dom";

const PostContent = ({ date, life, tableValues }) => {

    const [current, setCurrent] = useState("")
    const location = useLocation()

    useEffect(() => {
        let currentPage = location.pathname.split('/').filter(x => x)
        currentPage = currentPage[currentPage.length - 1]
        setCurrent(currentPage)
    }, [location.pathname])


    return (
        <>
            <Box display="flex" justifyContent={current.toLowerCase() === "mypost" ? "space-between" : "flex-end"} my={1}>
                {current.toLowerCase() === "mypost" && (
                    <Box display="flex" alignItems="center">
                        <Typography
                            fontSize={16}
                            sx={{alignItem: "center", display:"flex"}}
                            color={life >= 8 ? "green" : life >= 4 ? "orange" : "red"}>
                            <HourglassTopIcon fontSize="inherit" />
                        </Typography>
                        <Typography
                            fontSize={16}
                            sx={{ alignItem: "center", display: "flex",mt:0.3 }}
                            color={life >= 8 ? "green" : life >= 4 ? "orange" : "red"}>
                            {life}
                        </Typography>
                    </Box>
                )}
                <Typography
                    fontSize={16}
                    color="black">
                    {date}
                </Typography>
            </Box>
            {tableValues.map(({ name, value }, i) => <Table key={i} name={name} value={value} fcwidth={120} fontSize={16} />)}
        </>
    );
};

export default PostContent
