import {
  Logout, People, Person, VerifiedUser
} from '@mui/icons-material';


const data = [
  // {
  //   name: "Dashboard",
  //   path: "/admin/",
  //   icon: <Dashboard />
  // },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: <Person />
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <People />
  },
  {
    name: "Verification",
    path: "/admin/verification",
    icon: <VerifiedUser />
  },
  // {
  //   name: "Notification",
  //   path: "/admin/notification",
  //   icon: <Notifications />
  // },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />
  },
]

export default data