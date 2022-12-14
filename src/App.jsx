import React, { useContext, useEffect, useState } from "react";
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
  const { users, getAllUsers, currentUid, getCurrentUid } =
    useContext(UserContext);

  const user = users.find((item) => item.uid === currentUid);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    getCurrentUid();
  }, [getCurrentUid]);

  return (
    <>
      {user && (
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Start user={user} width={width} />}
          />
          <Route exact path="/register" component={AuthRegisterForm} />
          <Route exact path="/login" component={AuthLoginForm} />
          <Route
            path="/addpost"
            exact
            render={() => <PostForm user={user} />}
          />
          <Route
            path="/addlost"
            exact
            render={() => <LostPetForm user={user} />}
          />
          <Route
            path="/addfound"
            exact
            render={() => <FoundPetForm user={user} />}
          />
          <Route path="/lost/:id" exact component={LostPetProfile} />
          <Route
            path="/lost"
            exact
            render={() => <LostAnimals user={user} />}
          />
          <Route path="/found/:id" exact component={FoundPetProfile} />
          <Route
            path="/found"
            exact
            render={() => <FoundAnimals user={user} />}
          />
          <Route path="/hotels" exact component={Hotels} />
          <Route path="/walking" exact component={Walking} />
          <Route path="/fostering" exact component={Fostering} />
          <Route path="/vethelp" exact component={VetHelp} />
          <Route
            path="/profile"
            exact
            render={() => <UserProfile user={user} />}
          />
          <Route
            path="/posts/:id"
            exact
            render={() => <PostLarge user={user} />}
          />
          <Route path="/posts" exact render={() => <Posts user={user} />} />
          <Route path="*" exact render={() => <Redirect to="/" />} />
        </Switch>
      )}
      {!user && (
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Start user={user} width={width} />}
          />
          <Route exact path="/register" component={AuthRegisterForm} />
          <Route exact path="/login" component={AuthLoginForm} />
          <Route path="/lost/:id" exact component={LostPetProfile} />
          <Route
            path="/lost"
            exact
            render={() => <LostAnimals user={user} />}
          />
          <Route path="/found/:id" exact component={FoundPetProfile} />
          <Route
            path="/found"
            exact
            render={() => <FoundAnimals user={user} />}
          />
          <Route path="/posts" exact render={() => <Posts user={user} />} />
          <Route
            path="/posts/:id"
            exact
            render={() => <PostLarge user={user} />}
          />
          <Route path="*" exact render={() => <Redirect to="/" />} />
        </Switch>
      )}
    </>
  );
}

export default withRouter(App);
