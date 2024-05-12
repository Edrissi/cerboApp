import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  UserIcon
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";


export function DashboardNavbar({isAuthenticated ,user}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
      const token = Cookies.get('jwt');
      const response = await axios.post("http://localhost:8000/allUser/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Cookies.remove('jwt');
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar
  color={fixedNavbar ? "white" : "transparent"}
  className={`rounded-xl transition-all ${
    fixedNavbar
      ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
      : "px-0 py-1"
  }`}
  fullWidth
  blurred={fixedNavbar}
>
<div className="flex items-center flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          {/* <Avatar
                  src={user?.img}
                  alt="item-1"
                  size="sm"
                  variant="circular"
                /> */}
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 ml-2 font-normal"
                  >
                  <strong>{user?.nom}{' '} {user?.prenom} </strong>
                  </Typography>
                </div>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <ChevronDownIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
            <Link to="./profile">
              <MenuItem className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-blue-gray-500" />
                <div>
                  <Typography
                    variant="small"
                    color="text-blue-gray-500"
                    className="font-normal"
                  >
                    Profile
                  </Typography>
                </div>
              </MenuItem>
              </Link>
              <MenuItem className="flex items-center gap-3" onClick={handleLogout}>
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
                  <div>
                  <Typography
                    variant="small"
                    color="text-blue-gray-500"
                    className="font-normal"
                    
                  >
                    Logout
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
