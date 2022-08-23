import { Home, Person, Logout } from '@mui/icons-material';

const data = [
  {
    name: "Profile",
    path: "/manager/profile",
    icon: <Person />
  },
  {
    name: "My Boarding",
    path: "/manager/myboarding",
    icon: <Home />
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />
  },
]

export default data
