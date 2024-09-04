import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Articles from './Pages/Articles'
import Notary from './Pages/Notary'
import Essentials from './Pages/Essentials'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Forgot from './components/Forgot'
import Profile from './components/Profile'
import PersonalInfo from './components/PersonalInfo'
import Notification from './components/Notification'
import Search from './components/Search'
import UserProfile from './components/UserProfile'

function App() {
  

  return (
    <>
    
      <BrowserRouter>
          <Navbar/> 
            <Routes>    
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/articles' element={<Articles/>}/>
                <Route path='/kabin_notary' element={<Notary/>}/>
                <Route path='/nikah_essentials' element={<Essentials/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/forgot_pass' element={<Forgot/>}/>
                <Route path='/user_profile' element={<Profile/>}/>
                <Route path='/personal_info' element={<PersonalInfo/>}/>
                <Route path='/notification' element={<Notification/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/user_own_profile' element={<UserProfile/>}/>          
            </Routes>
            <Footer/>        
        </BrowserRouter>
      
    </>
  )
}

export default App
