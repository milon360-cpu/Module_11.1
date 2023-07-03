import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Register from './../Pages/Register/Register';
import Login from './../Pages/Login/Login';
import Profile from './../Pages/Profile/Profile';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
const Router = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/contact' element={<Contact />}/>
                <Route path='/profile' element={<Profile />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;