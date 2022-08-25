import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import WcIcon from '@mui/icons-material/Wc';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const BoardingCard = (boarding) => {
  return (
    <Card raised sx={{ width: 210, height: 270, mt: 2, mr: 3 }}>
      <Link to={`${boarding._id}`}>
        <CardMedia
          component="img"
          alt={boarding.boardingName}
          height="140"
          image={boarding.image[0]}
        />
        <CardContent sx={{ pt: 1 }}>
          <Box mb={1} >
            <Typography sx={{ fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center" }}>
              {boarding.boardingName}
              {boarding.available && <CheckCircleOutlinedIcon fontSize="small" sx={{ color: "success.main", ml: 0.5 }} />}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.main"><WcIcon fontSize="small" sx={{ mr:1}} />{boarding.gender}</Typography>
          <Typography variant="body2" color="text.main"><BedroomParentIcon fontSize="small" sx={{ mr:1}} />{boarding.roomType}</Typography>
          <Typography variant="body2" color="text.main"><LocationOnIcon fontSize="small" sx={{ mr:1}} />{boarding.address}</Typography>
        </CardContent>
      </Link>
    </Card >

  );
}

export default BoardingCard