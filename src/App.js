import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import PostWall from './Components/post_wall';
import ReviewPost from './Components/review_post';
import Index from './Components/index';
import Register from './Components/register';
import Profile from './Components/profile';

import './App.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {

  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} exact /> 
        <Route path="/PostWall" element={<PostWall />} exact /> 
        <Route path="/ReviewPost" element={<ReviewPost />} exact /> 
        <Route path="/Profile" element={<Profile />} exact /> 
        <Route path="/Register" element={<Register />} exact /> 
      </Routes>
    </BrowserRouter>
  )
};
