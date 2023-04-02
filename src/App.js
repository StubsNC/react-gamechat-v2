import LandingPage from "./Pages/LandingPage";
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Room from './Components/ChatRoomComponents/RoomPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from './Components/Auth/AuthPage';
import GenerateClipsPage from "./Pages/GenerateClipsPage/GenerateClipsPage";
import UserSettingsPage from "./Pages/UserSettingsPage";
import GalleryPage from "./Pages/GalleryPage";

function App() {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/AuthPage' element={<AuthPage />} />
          <Route path='/Room' element={<Room />} />
          <Route path='/GenerateClips' element={<GenerateClipsPage />} />
          <Route path='/Gallery' element={<GalleryPage  />} />
          <Route path='/UserSettings' element={<UserSettingsPage />} />

        </Routes>
        
    </BrowserRouter>
  );
}

export default App;
