import React, { useContext } from "react";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import { UserContext } from "../context/user/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { WidthContext } from "../context/width/widthContext";

const Main = ({ children }) => {
  const { user } = useContext(UserContext);
  const { width } = useContext(WidthContext);

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
