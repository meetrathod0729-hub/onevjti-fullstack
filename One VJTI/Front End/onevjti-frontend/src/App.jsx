import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPass from './pages/ForgotPass'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import EventCard from './components/Events/EventCard'
import Committees from "./pages/Committees";
import EventDetails from './pages/EventDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ChangePassword from './pages/ChangePassword'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
const App= ()=>{

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      {/* <Link to="/committees">Committees</Link> */}
      <main className="flex-grow">

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/users/dashboard' element={<Dashboard />}/>
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/notifications' element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
        <Route path='/users/change-password' element={
          <ProtectedRoute>
          <ChangePassword/>
          </ProtectedRoute>
        }/>
        <Route path="/users/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        <Route path='/users/forgotpass' element={<ForgotPass/>}/>.
        <Route path="/users/committees" element={<Committees />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
      </Routes>
      </main>
      <Footer />

    </div>
  
  ) 


}

  


export default App
