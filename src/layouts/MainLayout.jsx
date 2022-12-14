import React, { useContext, useEffect, useState } from "react";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import { UserContext } from "../context/user/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = ({ children }) => {
  const { users, getAllUsers, currentUid, getCurrentUid } =
    useContext(UserContext);
  const user = users.find((item) => item.uid === currentUid);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    getCurrentUid();
  }, [getCurrentUid]);

  useEffect(() => {
    setWidth(window.innerWidth);
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <>
      <Header type="main" width={width} user={user} />
      <div className="outer-container">
        {width > 900 && <SidebarLeft user={user} width={width} />}
        <div className="inner-container">{children}</div>
        {width > 900 && <SidebarRight width={width} user={user} />}
      </div>
      <Footer />
    </>
  );
};

export default Main;
