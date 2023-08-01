import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import {
//   HiOutlineHashtag,
//   HiOutlineHome,
//   HiOutlineMenu,
//   HiOutlinePhotograph,
//   HiOutlineUserGroup,
// } from "react-icons/hi";
import HouseIcon from "@mui/icons-material/House";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../components/Logo";

const links = [
  { name: "Discover", to: "/", icon: HouseIcon },
  // { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: GroupsIcon },
  // { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-white hover:text-secondary"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="lg:flex hidden flex-col h-screen w-[240px] py-10 px-4 bg-[#191624]">
        <Logo className="w-[50px]" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden xs:block top-6 left-3">
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
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "left-full"
        }`}
      >
        <Logo className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
