import React from "react";
import { FaHotel, FaDog, FaWalking, FaClinicMedical } from "react-icons/fa";
import NavButton from "../buttons/NavButton";

const NavServices = ({ width }) => {
  return (
    <div className="nav_services">
      <div className="nav_title">{width > 1520 ? "Services" : ""}</div>
      <div className="divider"></div>
      <NavButton
        path="/hotels"
        label={width > 1520 && "Hotels"}
        icon={<FaHotel />}
      />
      <NavButton
        path="/walking"
        label={width > 1520 && "Walking"}
        icon={<FaWalking />}
      />
      <NavButton
        path="/fostering"
        label={width > 1520 && "Fostering"}
        icon={<FaDog />}
      />
      <NavButton
        path="/vethelp"
        label={width > 1520 && "VetHelp"}
        icon={<FaClinicMedical />}
      />
      <div className="divider"></div>
    </div>
  );
};

export default NavServices;
