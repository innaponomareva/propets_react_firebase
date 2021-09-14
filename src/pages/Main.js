import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import Posts from '../components/main/Posts';
import LostAnimals from '../components/main/LostAnimals';
import FoundAnimals from '../components/main/FoundAnimals';
import Hotels from '../components/main/Hotels';
import Walking from '../components/main/Walking';
import Fostering from '../components/main/Fostering';
import VetHelp from '../components/main/VetHelp';
import SidebarLeft from '../components/main/sidebarLeft/SidebarLeft';
import SidebarRight from '../components/main/sidebarRight/SidebarRight';
import TopbarMain from '../components/topbars/TopbarMain';
import FooterMain from '../components/footers/FooterMain';
import Start from './Start';
import Profile from '../components/main/Profile';
import Col from 'react-bootstrap/Col';
import PostLarge from '../components/main/PostLarge';
import PostForm from '../components/main/PostForm';
import { UserContext } from '../context/user/userContext';
import LostPetProfile from '../components/main/LostPetProfile';
import LostPetForm from '../components/main/LostPetForm';
import FoundPetForm from '../components/main/FoundPetForm';
import FoundPetProfile from '../components/main/FoundPetProfile';
import NavSmallScreen from './../components/main/NavSmallScreen/NavSmallScreen';



const Main = () => {
  const uid = localStorage.getItem('LOCAL_ID');
  const { getUser } = useContext(UserContext);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);



  useEffect(
    // eslint-disable-next-line
    async()=>{
      if(uid){
        try{
          await getUser(uid);
        }catch(error){console.log(error)}
      }
      // eslint-disable-next-line
  },[])
  
  
  return(
    <>
    <div className="outer_container">
      <TopbarMain />
      <Container fluid className="d-flex flex-nowrap justify-content-center">
      {width >= 1024 && <SidebarLeft />}
       <Col xl="8" lg="10" md="12" sm="12" xs="12"  className="inner_component">
         {uid && 
          <Switch>
            <Route path="/" exact component={Start} />
            <Route path="/home/addpost" component={PostForm} />
            <Route path="/home/addlost" component={LostPetForm} />
            <Route path="/home/addfound" component={FoundPetForm} />
            <Route path="/home/lost/:id" component={LostPetProfile} />
            <Route path="/home/lost" component={LostAnimals} />
            <Route path="/home/found/:id" component={FoundPetProfile} />
            <Route path="/home/found" component={FoundAnimals} />
            <Route path="/home/hotels" component={Hotels} />
            <Route path="/home/walking" component={Walking} />
            <Route path="/home/fostering" component={Fostering} />
            <Route path="/home/vethelp" component={VetHelp} />
            <Route path="/home/profile" component={Profile} />
            <Route path="/home/posts/:id" component={PostLarge} />
            <Route path="/home/posts" component={Posts} />
           </Switch>
          }
          {!uid && 
            <Switch>
              <Route path="/" exact component={Start} />
              <Route path="/home/lost/:id" component={LostPetProfile} />
              <Route path="/home/lost" component={LostAnimals} />
              <Route path="/home/found/:id" component={FoundPetProfile} />
              <Route path="/home/found" component={FoundAnimals} />
            </Switch>
          }
        </Col>
        {uid && width >= 1024 && <SidebarRight />}
        {uid && width <= 1024 && <NavSmallScreen />}
          
      </Container>
      <FooterMain />
    </div>
    </>
  )
}

export default Main;
