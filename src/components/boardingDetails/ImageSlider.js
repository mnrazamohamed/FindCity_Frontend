import { CardMedia } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import default_image from '../../localData/image/default_image.jpg'

const ImageSlider = ({ images }) => {
    return (
        <Carousel
            sx={{
                width: 400,
                height: 300,
                borderRadius: 0.5,
                borderColor: "border",
                borderStyle: "solid",
                borderWidth: 1,
                boxShadow: 10,
            }}
        >
            {
                images.map(( image , i) =>
                    <CardMedia
                        key={i}
                        component="img"
                        width={400}
                        height={300}
                        image={image}
                        alt={"Image"}
                        onError={({ currentTarget }) => { currentTarget.src = default_image }}
                    />
                )
            }
        </Carousel>
    )
}

export default ImageSlider