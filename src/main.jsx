import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Onboarding from './pages/Onboarding.jsx';

import Layout from './pages/Layout.jsx';
import Ola from './pages/Ola.jsx'
import Explore from './pages/Explore.jsx'
import CreateSession from './pages/CreateSession.jsx'
import SessionDetail from './pages/SessionDetail.jsx'
import EditSession from './pages/EditSession.jsx'
import MyProfile from './pages/MyProfile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import PublicProfile from './pages/PublicProfile.jsx'
import MySessions from './pages/MySessions.jsx'
import Notifications from './pages/Notifications.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Ola/>}/>
        <Route path="explore" element={<Explore />} />
        <Route path="create" element={<CreateSession />} />
        <Route path="session/:id" element={<SessionDetail />} />
        <Route path="session/:id/edit" element={<EditSession />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/:id" element={<PublicProfile />} />
        <Route path="my-sessions" element={<MySessions />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/onboarding' element={<Onboarding/>}/>
    </Routes>
  </BrowserRouter>
)
