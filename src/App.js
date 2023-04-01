import LandingPage from "./Pages/LandingPage";
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Room from './Components/ChatRoomComponents/RoomPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from './Components/Auth/AuthPage';

function App() {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/AuthPage' element={<AuthPage />} />
          <Route path='/Room' element={<Room />} />
        </Routes>
        
    </BrowserRouter>
  );
}

export default App;
