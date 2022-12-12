import React from "react";
import Header from "../components/Header";
import Stage from "../components/Stage";
import SectionOneStart from "../components/SectionOneStart";
import SectionTwoStart from "../components/SectionTwoStart";
import Footer from "../components/Footer";

const Start = ({ user, width }) => {
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
