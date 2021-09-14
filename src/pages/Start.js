import React from 'react';
import TopbarStart from '../components/topbars/TopbarStart';
import FooterStart from '../components/footers/FooterStart';
import Header from '../components/start/Header';
import SectionOneStart from '../components/start/SectionOneStart';
import SectionTwoStart from '../components/start/SectionTwoStart';

const Start = () => {
  return(
  <>
    <TopbarStart/>
    <Header />
    <SectionOneStart />
    <SectionTwoStart />
    <FooterStart />
  </>
  )
}

export default Start;