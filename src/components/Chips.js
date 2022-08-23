import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';
import React from 'react';

const Chips = ({ data }) => {

  return (
    <Box display="flex" flexWrap="wrap" maxWidth={600}>
      {
        data.map((item, index) =>
          <Chip
            key={index}
            label={String(item).toUpperCase()}
            variant={"filled"}
            sx={chip_style} >
          </Chip>
        )
      }
    </Box >
  )
}

export default Chips


const chip_style = {
  width: 100,
  mr: 2,
  my: 1,
  bgcolor: "background.mainbg",
  color: "white",
  ":hover": {
    bgcolor: `primary.light`
  }

}