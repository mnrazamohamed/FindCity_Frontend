import {
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText, Toolbar
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import hostelerData from "../localData/Drawer/hostelerDrawerData";
import managerData from "../localData/Drawer/ManagerDrawerData";
import adminData from "../localData/Drawer/AdminDrawerData";
import { authActions } from '../store/authSlice';

const SidePanel = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState("");
  const location = useLocation()
  const drawerState = useSelector(state => state.leftDrawer.status)

  useEffect(() => {
    const pathArrays = location.pathname.split("/").filter(x => x)
    const headerTabs = ['home', 'boarding', 'mypost']

    //profile tab - hosteler,manager,admin
    if (
      (pathArrays[0] === "hosteler" || pathArrays[0] === "manager" || pathArrays[0] === "admin") &&
      (pathArrays[1] === "profile" || headerTabs.includes(pathArrays[1]))
    ) {
      setCurrent(pathArrays[1] === "profile" ? "profile" : "");
      if (pathArrays[0] === "hosteler") setData(hostelerData)
      if (pathArrays[0] === "manager") setData(managerData)
      if (pathArrays[0] === "admin") setData(adminData)
    }

    //myboarding tab - manager
    if (
      pathArrays[0] === "manager" &&
      (pathArrays[1] === "myboarding" || headerTabs.includes(pathArrays[1]))) {
      setCurrent(pathArrays[1] === "myboarding" ? "myboarding" : ""); setData(managerData)
    }

    //users tab - admin
    if (
      pathArrays[0] === "admin" &&
      (pathArrays[1] === "users" || headerTabs.includes(pathArrays[1]))) {
      setCurrent(pathArrays[1] === "users" ? "users" : ""); setData(adminData)
    }

    //users tab - admin
    if (
      pathArrays[0] === "admin" &&
      (pathArrays[1] === "verification" || headerTabs.includes(pathArrays[1]))) {
      setCurrent(pathArrays[1] === "verification" ? "verification" : ""); setData(adminData)
    }


  }, [location])

  const buttonOnClick = (name) => (name === "Logout") && dispatch(authActions.reset())



  const hoverStyle = () => {
    let element = null

    if (drawerState)
      element = "MuiListItemButton"
    else
      element = "MuiSvgIcon"

    return {
      [`& .${element}-root:hover`]: {
        borderRadius: element === "MuiSvgIcon" ? 0.3 : 0.2,
        backgroundColor: "primary.main",
        px: 1,
        color: "white"
      },
    }
  }

  const selectedStyle = (name) => {
    if (name === "my boarding") name = "myboarding"
    if (current === name)
      if (drawerState)
        return style_selected_open
      else
        return style_selected_close
  }

  return (
    <Drawer
      variant="permanent"
      open={drawerState}
      sx={hoverStyle()}>
      <Toolbar />
      <List>
        {data.map(({ name, path, icon }, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block', ...selectedStyle(name.toLowerCase()) }}>
            <Link to={path}>
              <ListItemButton
                onClick={() => buttonOnClick(name)}
                sx={{
                  minHeight: 48,
                  justifyContent: drawerState ? 'initial' : 'center',
                  marginX: 1.5,
                  paddingX: 0
                }} >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerState ? 2 : 'auto',
                    justifyContent: 'center',
                  }} >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ opacity: drawerState ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SidePanel

// custom drawer to animate open and close
const drawerWidth = 180;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    ...(open && {
      ...theme.mixins.openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': theme.mixins.openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...theme.mixins.closedMixin(theme),
      '& .MuiDrawer-paper': theme.mixins.closedMixin(theme),
    }),
  }),
);

const style_selected_open = {
  '& .MuiListItemButton-root': {
    borderRadius: 0.2,
    backgroundColor: "primary.main",
    px: 1,
    color: "white"
  },
  '& .MuiSvgIcon-root': {
    backgroundColor: "primary.main",
    px: 1,
    color: "white"
  },
}
const style_selected_close = {
  '& .MuiSvgIcon-root': {
    backgroundColor: "primary.main",
    px: 1,
    color: "white"
  },
}
