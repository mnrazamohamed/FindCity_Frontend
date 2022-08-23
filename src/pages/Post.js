import { Box, Paper, Typography, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPosts } from "../services/post";
import PostComp from "./../components/Post";
import BtnText from "../components/core/btnText"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../store/dialogSlice";
import defaultImage from "../localData/image/default_image.jpg"
import ad01 from "../localData/image/ad01.jpeg"
import ad02 from "../localData/image/ad02.jpg"
import ad03 from "../localData/image/ad03.jpg"
import ad04 from "../localData/image/ad04.png"
import ad05 from "../localData/image/ad05.jpg"
import srvc01 from "../localData/image/srvc01.png"
import srvc02 from "../localData/image/srvc02.png"
import srvc03 from "../localData/image/srvc03.png"

const formatAMPM = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const Post = () => {

  const [post, setPosts] = useState(undefined)
  const [loading, setLoading] = useState(undefined)
  const dispatch = useDispatch()
  const location = useLocation()
  const auth = useSelector(state => state.auth)
  const update = useSelector(state => state.forceUpdate.post)


  const loadData = async () => {

    setPosts(undefined)
    setLoading(true)
    let currentPage = location.pathname.split('/').filter(x => x)
    currentPage = currentPage[currentPage.length - 1]

    if (currentPage.toLowerCase() === "mypost") {
      var { data: { post }, status } = await getPosts(auth.userID)
    }
    else// eslint-disable-next-line
      var { data: { post }, status } = await getPosts()


    if (status === 200) {
      post = post.filter(post => post.life !== 0)
      post = post.map(post => {
        const date = new Date(post.createdAt)
        return {
          data: post,
          id: post._id,
          life: post.life,
          request: post.request,
          date: `${date.toLocaleDateString('en-GB').replaceAll('/', '.')} | ${formatAMPM(date)}`,
          tableValues: [
            { name: "Name", value: post.name },
            { name: "Hometown", value: post.from },
            { name: "Gender", value: post.gender },
            { name: "Price range", value: post.priceRange },
            { name: "Room location", value: post.roomLocation },
            { name: "Room type ", value: post.roomType },
          ]
        }
      })
    }

    setPosts(post)
    setLoading(undefined)
  }

  const handleCreatePostClick = () => {
    dispatch(dialogActions.show({ name: "post" }))
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [location.pathname, update])

  return (
    <>
      <Box display="flex" justifyContent="space-evenly" width="100%" mt={3} >

        {/* Services */}
        <Box width={400} p={1} >
          <Paper sx={paper_style} >
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" pt={2}>
              <Typography variant="h6" fontWeight={500} mb={1.5} color="initial">Services</Typography>
              <Link href="#" target="_blank"> <Box component="img" src={srvc01} width={300} borderRadius={3} mb={3} /> </Link>
              <Link href="#" target="_blank"> <Box component="img" src={srvc02} width={300} borderRadius={3} mb={3} /> </Link>
              <Link href="#" target="_blank"> <Box component="img" src={srvc03} width={300} borderRadius={3} mb={3} /> </Link>
            </Box>
          </Paper>
        </Box>

        {/* posts */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" width={500} height="70vh">
            <Typography fontSize={22} textAlign="center" fontWeight={900}>Loading...</Typography>
          </Box>
        )}

        {!loading && !(post instanceof Array) && (
          <Box>
            {auth.role === "hosteler" && (
              <Box display="flex" justifyContent="end">
                <BtnText name="Create Post" type="button" onClick={handleCreatePostClick} sx={btnCreatePost_style} />
              </Box>
            )}
            <Box display="flex" justifyContent="center" alignItems="center" width={500} height="70vh">
              <Typography fontSize={22} textAlign="center" fontWeight={900}>No post yet :(</Typography>
            </Box>
          </Box>
        )}

        {(post instanceof Array) && (
          <Box >
            {auth.role === "hosteler" && (
              <Box display="flex" justifyContent="end">
                <BtnText name="Create Post" type="button" onClick={handleCreatePostClick} sx={btnCreatePost_style} />
              </Box>
            )}
            < Box display="flex" flexDirection="column" >
              {post.map(data => <PostComp key={data.id} data={data} />)}
            </Box>
          </Box>
        )}

        {/* Ads */}
        <Box width={400} p={1} >
          <Paper sx={paper_style} >
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" pt={2}>
              <Typography variant="h6" fontWeight={500} mb={1.5} color="initial">Advertisements</Typography>
              <Link href="https://www.toyota.lk/" target="_blank"> <Box component="img" src={ad01} width={300} borderRadius={3} mb={3} /> </Link>
              <Link href="https://www.milo.lk/homepage" target="_blank"> <Box component="img" src={ad02} width={300} borderRadius={3} mb={3} /> </Link>
              <Link href="https://www.pepsi.com/" target="_blank"> <Box component="img" src={ad03} width={300} borderRadius={3} mb={3} /> </Link>
              <Link href="https://www.glowandlovelycareers.lk/en/" target="_blank"> <Box component="img" src={ad04} width={300} borderRadius={3} mb={3} /> </Link>
              <Link href="https://www.cargillsceylon.com/businesses/magic" target="_blank"> <Box component="img" src={ad05} width={300} borderRadius={3} mb={3} /> </Link>
            </Box>
          </Paper>
        </Box>

      </Box >
    </>
  )
}


export default Post;

const btnCreatePost_style = {
  width: 150,
  borderRadius: 1,
  fontSize: 16,
  fontWeight: 700,
  px: 0,
  mx: 0,
}

const paper_style = {
  bgcolor: "#eee",
  position: "fixed",
  p: 3,
  pt:0,
  overflowY: "scroll",
  maxHeight: "85vh",
  width: 400,
  '&::-webkit-scrollbar': {
    width: 0,
  },
}