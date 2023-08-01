import * as React from "react";
import { Avatar, Divider, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HouseIcon from "@mui/icons-material/House";
import GroupsIcon from "@mui/icons-material/Groups";
import Logo from "../components/Logo";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link as RouterLink, useNavigate, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { record } from "../features/user-history/userHistorySlice";

const links = [
  { name: "Discover", to: "/", icon: HouseIcon },
  { name: "Top Artists", to: "/top-artists", icon: GroupsIcon },
  { name: "Top Charts", to: "/top-charts", icon: AutoGraphIcon },
  { name: "Playlist", to: "/playlists", icon: QueueMusicIcon },
];

const NavLinks = ({ handleClick }) => (
  <div className="flex flex-col items-center xs:gap-6 md:mt-10 lg:mt-0 md:gap-10 lg:gap-0 xs:mt-10 lg:flex-row lg:mr-14">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row text-center items-center mr-6 text-sm font-medium text-white hover:text-primary"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

export default function MainHeader() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(
      record({
        userId: user._id,
        data: "User Log Out",
        action: "logout",
      })
    );
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Setting
      </MenuItem>

      <MenuItem onClick={handleLogout} sx={{ ml: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          color="inherit"
          sx={{ mr: 2 }}
        ></IconButton>

        <div className="xs:flex lg:ml-5 md:justify-center xs:justify-center xs:w-full xs:items-center">
          <Logo />
        </div>

        <Box sx={{ flexGrow: 1 }} />

        <div className="lg:flex hidden lg:flex-row">
          <NavLinks />
        </div>

        <div className="absolute lg:hidden md:block xs:block top-6 left-5">
          {!mobileMenuOpen ? (
            <MenuIcon
              className="w-6 h-6 mr-2 text-white"
              onClick={() => setMobileMenuOpen(true)}
            />
          ) : (
            <CloseIcon
              className="w-6 h-6 mr-2 text-white"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </div>

        <div
          className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 lg:hidden smooth-transition ${
            mobileMenuOpen ? "left-0" : "left-full"
          }`}
        >
          <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        </div>

        <Box>
          <Avatar
            src={user?.avatarUrl}
            alt={user?.name}
            onClick={handleProfileMenuOpen}
          />
        </Box>
        {renderMenu}
      </Toolbar>
    </Box>
  );
}
