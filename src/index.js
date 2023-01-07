import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { UserState } from "./context/user/userState";
import { PetState } from "./context/pet/petState";
import { PostState } from "./context/post/postState";
import { LostState } from "./context/lost/lostState";
import { FoundState } from "./context/found/foundState";
import { WidthState } from "./context/width/widthState";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WidthState>
    <UserState>
      <PetState>
        <PostState>
          <LostState>
            <FoundState>
              <HashRouter>
                <App />
              </HashRouter>
            </FoundState>
          </LostState>
        </PostState>
      </PetState>
    </UserState>
  </WidthState>
);
