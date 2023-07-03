import React,{useEffect, useState} from 'react';
import  {useNavigate} from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState();
    // Authorization 
    useEffect(()=>
    {
        const token = localStorage.getItem("token");
        if(token)
        {
            fetch("http://localhost:5000/profile",
            {
                method : "GET",
                headers:
                {
                    "Content-Type": "application/json",
                    Authorization : token
                }
            })
            .then((response)=> response.json())
            .then((data)=>
            {
                if(data.success)
                {
                    navigate("/profile");
                    setUserInfo(data.email);
                }
                else 
                {
                    navigate("/")
                }
            })
            .catch((err)=>
            {
                navigate("/");
            })
        }
        else 
        {
            navigate("/");
        }
        
    },[])
    return (
        <div>
            <h2>Hello {userInfo}</h2>         
        </div>
    );
};

export default Profile;