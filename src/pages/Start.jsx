import React, { useContext } from "react";
import Header from "../components/Header";
import Stage from "../components/Stage";
import SectionOneStart from "../components/SectionOneStart";
import SectionTwoStart from "../components/SectionTwoStart";
import Footer from "../components/Footer";
import { UserContext } from "../context/user/userContext";
import { WidthContext } from "../context/width/widthContext";

const Start = () => {
  const { user } = useContext(UserContext);
  const { width } = useContext(WidthContext);
  return (
    <div>
      <Header type="start" user={user} width={width} />
      <div className="outer-container-start">
        <Stage />
        <SectionOneStart />
        <SectionTwoStart />
      </div>
      <Footer />
    </div>
  );
};

export default Start;
