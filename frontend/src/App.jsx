import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser, setAuthUser}= useAuthContext()
  return (
     <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path = '/' element = {authUser ? <Home /> : <Navigate to = {"/login"} />} />
        <Route path = '/login' element = {authUser ? <Navigate to = '/' /> : <Login />} />
        <Route path = '/signup' element = {authUser ? <Navigate to = '/' /> : <Signup />} />
    {/* <Home />  */}
{/*   Router makes it possible to use these */}
    {/* BUTTON SAMPLES
    <button className="btn">Button</button>
    <button className="btn btn-neutral">Neutral</button>
    <button className="btn btn-primary">Primary</button>
    <button className="btn btn-secondary">Secondary</button>
    <button className="btn btn-accent">Accent</button>
    <button className="btn btn-ghost">Ghost</button>
    <button className="btn btn-link">Link</button> */}
    </Routes>
    <Toaster />
  </div>
  )
}

export default App
