import "./App.css";
import { Navbar } from "./components/common/Navbar";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { useState } from "react";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Genre } from "./pages/Genre";

function App(){

  const [overlayStatus,setOverlayStatus]=useState(false);

  return (
    <div className={`${overlayStatus?"fixed":""} w-screen min-h-screen bg-richblack-900 flex flex-col font-inter`}>
      
      <Navbar/>
      <Routes>
        <Route path='/' element=
          {
            <Home/>  
          }>
        </Route>
        <Route path='/login' element=
          {
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }>
        </Route>
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path='/signup' element=
          {
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }>
        </Route>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path='*' element={<Error/>}></Route>
        <Route path='/genre/:genreName' element={<Genre/>}></Route>
        <Route path='dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </div> 
  );
}

export default App;
