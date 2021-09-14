import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthState } from './context/auth/authState';
import { UserState } from './context/user/userState';
import { PostState } from './context/post/postState';
import { LostState } from './context/lost/lostState';
import { FoundState } from './context/found/foundState';

ReactDOM.render(
  <AuthState>
    <UserState>
        <PostState>
          <LostState>
            <FoundState>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FoundState>
          </LostState>
        </PostState>
    </UserState>
  </AuthState>,
  document.getElementById('root')
);

