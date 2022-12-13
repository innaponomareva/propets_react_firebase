import React, { useContext, useEffect, useState } from "react";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import { UserContext } from "../context/user/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCurrentUserUid_fb } from "../service/userService";

const Main = ({ children }) => {
  const { users, getAllUsers, authSuccess } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserUid = await getCurrentUserUid_fb();
      const currentUser = users.find((item) => item.uid === currentUserUid);
      setUser(currentUser);
    };
    fetchCurrentUser();
  }, [setUser, users, authSuccess]);

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
