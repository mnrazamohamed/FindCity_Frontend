import { Box, Paper, Typography, Link, Autocomplete, TextField, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPosts } from "../services/post";
import PostComp from "./../components/Post";
import BtnText from "../components/core/btnText"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../store/dialogSlice";
import ad01 from "../localData/image/ad01.jpeg"
import ad02 from "../localData/image/ad02.jpg"
import ad03 from "../localData/image/ad03.jpg"
import ad04 from "../localData/image/ad04.png"
import ad05 from "../localData/image/ad05.jpg"
import srvc01 from "../localData/image/srvc01.png"
import srvc02 from "../localData/image/srvc02.png"
import srvc03 from "../localData/image/srvc03.png"
import CloseIcon from '@mui/icons-material/Close';

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
  const [cities, setCities] = useState(undefined)


  const handleCityFilter = (e, v) => {
    if (!v)
      loadData()
    else
      loadData(v)
  }

  const loadData = async (roomLocation) => {

    setPosts(undefined)
    setLoading(true)
    let currentPage = location.pathname.split('/').filter(x => x)
    currentPage = currentPage[currentPage.length - 1]

    if (currentPage.toLowerCase() === "mypost") {

      // eslint-disable-next-line
      if (roomLocation)
        var { data: { post }, status } = await getPosts(auth.userID, `roomLocation=${roomLocation}`)
      else
        var { data: { post }, status } = await getPosts(auth.userID)
      console.log(roomLocation);
    }
    else
      if (roomLocation)
        var { data: { post }, status } = await getPosts(undefined, `roomLocation=${roomLocation}`)
      else
        var { data: { post }, status } = await getPosts()


    if (status === 200) {

      post = post.filter(post => post.life !== 0 && post.approval)
      if (!roomLocation) setCities(new Array(...new Set(post.map(p => p.roomLocation))))
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
        <Box width={100} p={1} >
          <Paper sx={paper_style} >
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" pt={2}>
              <Typography variant="h6" fontWeight={500} mb={1.5} color="initial">Services</Typography>
              <Link href="#" target="_blank"> <Box component="img" src={srvc01} width={200} borderRadius={1} mb={1.3} /> </Link>
              <Link href="#" target="_blank"> <Box component="img" src={srvc02} width={200} borderRadius={1} mb={1.3} /> </Link>
              <Link href="#" target="_blank"> <Box component="img" src={srvc03} width={200} borderRadius={1} mb={0.2} /> </Link>
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
          <Box>
            <Box display="flex" justifyContent="space-between">
              {cities && (
                <Autocomplete
                  size='small'
                  options={cities}
                  onChange={handleCityFilter}
                  getOptionLabel={option => option}
                  PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                  sx={{ width: 250, ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: "4px !important" } }}
                  renderInput={(params) => (
                    <Box display="flex" alignItems="center">
                      < TextField
                        {...params}
                        placeholder={"Cities"}
                      />
                      <IconButton sx={{ ml: 1 }} onClick={() => loadData()}><CloseIcon /></IconButton>
                    </Box>
                  )}
                />
              )}
              {auth.role === "hosteler" && (
                <Box display="flex" justifyContent="end">
                  <BtnText name="Create Post" type="button" onClick={handleCreatePostClick} sx={btnCreatePost_style} />
                </Box>
              )}
            </Box>

            < Box display="flex" flexDirection="column" >
              {post.map(data => <PostComp key={data.id} data={data} />)}
            </Box>
          </Box>
        )}

        {/* Ads */}
        <Box width={100} p={1} display="flex" justifyContent="right">
          <Paper sx={paper_style} pb={20}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" pt={2}>
              <Typography variant="h6" fontWeight={500} mb={1.5} color="initial">Advertisements</Typography>
              <Link href="https://www.toyota.lk/" target="_blank"> <Box component="img" src={ad01} width={200} borderRadius={1} mb={1.3} /> </Link>
              <Link href="https://www.milo.lk/homepage" target="_blank"> <Box component="img" src={ad02} width={200} borderRadius={1} mb={1.3} /> </Link>
              <Link href="https://www.pepsi.com/" target="_blank"> <Box component="img" src={ad03} width={200} borderRadius={1} mb={1.3} /> </Link>
              <Link href="https://www.glowandlovelycareers.lk/en/" target="_blank"> <Box component="img" src={ad04} width={200} borderRadius={1} mb={1.3} /> </Link>
              <Link href="https://www.cargillsceylon.com/businesses/magic" target="_blank"> <Box component="img" src={ad05} width={200} borderRadius={1} mb={2} /> </Link>
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
  "&:hover": {
    backgroundColor: '#f0f2f5',

  },
}

const paper_style = {
  bgcolor: "#E4E6EB",
  position: "fixed",
  borderRadius: 0.3,
  p: 3,
  pt: 0,
  pb: 4,
  // overflowY: "scroll",
  maxHeight: "86.8vh",
  width: 280,
  '&::-webkit-scrollbar': {
    width: 0,
  },
}

const paperStyle = {
  bgcolor: "background.mainbg",
  border: "1px solid #CED0D3",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}