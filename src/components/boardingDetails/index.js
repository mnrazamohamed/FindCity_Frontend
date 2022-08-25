import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import Chips from '../Chips';
import Table from '../core/Table';
import ImageSlider from './ImageSlider';
import Map from './Map';

const BoardingDetails = ({ data }) => {
    return (
        <Box display="flex" justifyContent="space-evenly" mt={5}>

            {/* Details */}
            <Box minWidth={500}>
                <Box mb={4}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="title" >
                            {data.name}
                        </Typography>
                        <Typography variant="title" color={data.availability? "green" : "red"} sx={{ ml: 2 }}>
                            {data.availability ? "Available" : "Unavailable"}
                        </Typography>
                    </Box>
                    <Chips data={data.facilities[0][0].split(',')} />
                </Box>
                {data.rows.map((row, i) => <Table
                    key={i}
                    name={row.name}
                    value={row.value}
                    fcwidth={250}
                    fontSize={22}
                    sx={table_style}
                    width={800}
                />)}

            </Box>

            {/* Image and map */}
            <Box>
                <ImageSlider images={data.images} />
                <Map lat={Number.parseFloat(data.geoloc[1])} lng={Number.parseFloat(data.geoloc[0])} />
            </Box>

        </Box >
    )
}

export default BoardingDetails

const table_style = {
    fontWeight: 600,
    height: 60
}
