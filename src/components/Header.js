import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { drawerActions } from '../store/drawerSlice';
import logo from '../localData/image/Homefindcitylogo.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getPosts } from '../services/post';

const Header = () => {

  const drawerState = useSelector(state => state.leftDrawer.status)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [current, setCurrent] = useState("")
  const [hbLock, setHBLock] = useState(false)
  const location = useLocation()

  const checkHostelerPost = async () => {
    const { status } = await getPosts(auth.userID)
    if (status === 404) setHBLock(true)
  }

  useEffect(() => {
    const page = location.pathname.split("/").filter(x => x)[1]
    setCurrent(page)
    if (auth.role === "hosteler") checkHostelerPost()
    // eslint-disable-next-line 
  }, [location])

  const handleDrawerState = () => drawerState ? dispatch(drawerActions.hide()) : dispatch(drawerActions.show())
  const closeLeftDrawer = () => dispatch(drawerActions.hide())



  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerState}
            edge="start"
            sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>

          <Box display="flex" width={300} mt={1} sx={styleMenu} mx={2} alignItems="center" flexGrow={1}>
            <Box onClick={closeLeftDrawer}>
              <Link to={`/${auth.role}/home`} ><Typography>Home</Typography></Link>
              <Divider sx={current === "home" ? { bgcolor: "white" } : { opacity: 0 }} />
            </Box>

            {
              auth.role === "hosteler" && (
                <>
                  <Box onClick={closeLeftDrawer}>
                    <Link to={`/${auth.role}/mypost`}  ><Typography>My Post</Typography></Link>
                    <Divider sx={current === "mypost" ? { bgcolor: "white" } : { opacity: 0 }} />
                  </Box>
                  <Box onClick={closeLeftDrawer}>
                    <Link to={!hbLock && `/${auth.role}/boarding`}  >
                      <Typography
                        sx={{ display: "flex", alignItems: "center", cursor: hbLock ? "default !important" : "pointer !important" }}
                        color={hbLock ? "rgb(255,255,255,0.5) !important" : "white !important"}>
                        Boarding
                        {hbLock && (
                          <Tooltip PopperProps={PopperProps} title="Create one post to unlock." placement="right">
                            <LockOutlinedIcon fontSize='small' sx={{ color: "white", cursor: "help !important" }} />
                          </Tooltip>
                        )}
                      </Typography>
                    </Link>
                    <Divider sx={current === "boarding" ? { bgcolor: hbLock ? "rgb(255,255,255,0.5) !important" : "white" } : { opacity: 0 }} />
                  </Box>
                </>
              )
            }


            {
              auth.role === "admin" && (
                <Box onClick={closeLeftDrawer}>
                  <Link to={`/${auth.role}/boarding`}  ><Typography>Boarding</Typography></Link>
                  <Divider sx={current === "boarding" ? { bgcolor: "white" } : { opacity: 0 }} />
                </Box>
              )
            }

          </Box>

          <Box display="flex" alignItems="center" >
            <Box component="img" src={logo} width={40} height={40} sx={{ bgcolor: "white", borderRadius: 100, m: 1, p: 0.5 }} />
            <Typography fontWeight={700} fontSize={20} color="white">FIND CITY</Typography>
          </Box>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header

//style
const styleMenu = {
  ".MuiBox-root": {
    marginLeft: 5,
    ".MuiTypography-root": {
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      color: "white",
    },
    ".MuiDivider-root": {
      transition: "background 0.3s, color 0.3s",
      height: 3,
      borderRadius: 1,
      mt: 0.5
    }
  }
}

const PopperProps = {
  sx: {
    p: 0,
    "& .MuiTooltip-tooltip": {
      m: 0,
      fontSize: 13,
      color: "black",
      bgcolor: "white",
      boxShadow: 700,
      textAlign: "center",
      borderRadius: 0.3,
    }
  }
}