import React, { useEffect, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import './Navigation.css'
import { FaUser } from "react-icons/fa";
import img from "./profile.jpeg"
const Navigation = () => {
    const [flag,setFlag] = useState(false);
    useEffect(()=>
    {
        if(localStorage.getItem("token"))
        {
            setFlag(true)
        }
        else 
        {
            setFlag(false);
        }
    })
    const navigate = useNavigate();
    return (
        <div className='nav-container'>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <NavLink className="navbar-brand" href="#">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
             <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item"> <NavLink className="nav-link" to={"/"}>Home</NavLink></li>               
                <li className="nav-item"> <NavLink className="nav-link" to={"/about"}>About</NavLink></li>               
                <li className="nav-item"> <NavLink className="nav-link" to={"/contact"}>Contact</NavLink></li>               
                <li className="nav-item dropdown">
                  <NavLink className="nav-link " id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {
                         !flag ?
                         <FaUser ></FaUser>
                         :
                         <span> <img src={img} alt="" className='profile' /> <span>Milon</span></span>
                    }    
                 </NavLink>
                   { 
                      
                       !flag ? 
                       <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><NavLink className="dropdown-item" to={"/register"}>Registration</NavLink></li>
                            <li><NavLink className="dropdown-item" to={"/login"}>Login</NavLink></li>
                        </ul>
                        :
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><NavLink className="dropdown-item">My account</NavLink></li>
                            <li><NavLink className="dropdown-item" onClick={()=>
                            {
                                localStorage.removeItem("token");
                                setFlag(false);
                                
                            }} to={"/"}>Logout</NavLink></li>
                        </ul>


                    }
                </li>
               </ul>
            </div>
           </div>
           </nav>
        </div>
    );
};

export default Navigation;