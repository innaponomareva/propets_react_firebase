import React, { useContext } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Start from "./pages/Start";
import PostLarge from "./pages/PostLarge";
import UserProfile from "./pages/UserProfile";
import PostForm from "./pages/PostForm";
import LostPetForm from "./pages/LostPetForm";
import FoundPetForm from "./pages/FoundPetForm";
import LostPetProfile from "./pages/LostPetProfile";
import LostAnimals from "./pages/LostAnimals";
import FoundPetProfile from "./pages/FoundPetProfile";
import FoundAnimals from "./pages/FoundAnimals";
import Hotels from "./pages/Hotels";
import Fostering from "./pages/Fostering";
import Walking from "./pages/Walking";
import VetHelp from "./pages/VetHelp";
import Posts from "./pages/Posts";
import AuthRegisterForm from "./pages/AuthRegisterForm";
import AuthLoginForm from "./pages/AuthLoginForm";
import { UserContext } from "./context/user/userContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (
        <Switch>
          <Route path="/" exact component={Start} />
          <Route exact path="/register" component={AuthRegisterForm} />
          <Route exact path="/login" component={AuthLoginForm} />
          <Route path="/addpost" exact component={PostForm} />
          <Route path="/addlost" exact component={LostPetForm} />
          <Route path="/addfound" exact component={FoundPetForm} />
          <Route path="/lost/:id" exact component={LostPetProfile} />
          <Route path="/lost" exact component={LostAnimals} />
          <Route path="/found/:id" exact component={FoundPetProfile} />
          <Route path="/found" exact component={FoundAnimals} />
          <Route path="/hotels" exact component={Hotels} />
          <Route path="/walking" exact component={Walking} />
          <Route path="/fostering" exact component={Fostering} />
          <Route path="/vethelp" exact component={VetHelp} />
          <Route path="/profile" exact component={UserProfile} />
          <Route path="/posts/:id" exact component={PostLarge} />
          <Route path="/posts" exact component={Posts} />
          <Route path="*" exact render={() => <Redirect to="/" />} />
        </Switch>
      )}
      {!user && (
        <Switch>
          <Route path="/" exact component={Start} />
          <Route exact path="/register" component={AuthRegisterForm} />
          <Route exact path="/login" component={AuthLoginForm} />
          <Route path="/lost/:id" exact component={LostPetProfile} />
          <Route path="/lost" exact component={LostAnimals} />
          <Route path="/found/:id" exact component={FoundPetProfile} />
          <Route path="/found" exact component={FoundAnimals} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/posts/:id" exact component={PostLarge} />
          <Route path="*" exact render={() => <Redirect to="/" />} />
        </Switch>
      )}
    </>
  );
}

export default withRouter(App);
