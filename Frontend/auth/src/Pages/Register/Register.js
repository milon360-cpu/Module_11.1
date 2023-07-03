import React, { useState,useEffect } from 'react';
import './Register.css'
import  {useNavigate} from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();
    const [registerData,setRegisterData] = useState({email:'',password:''});

    const handelChange = (e)=>
    {
        setRegisterData({...registerData,[e.target.name]:e.target.value})
    }
    const handelSubmit = (e)=>
    {
        e.preventDefault();
        fetch("http://localhost:5000/register/user",
        {
            method : "POST",
            headers  :
            {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(registerData)
        })
        .then((response)=> response.json())
        .then((data)=>
        {
            if(data.success)
            {
                navigate("/login");
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }

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
                    navigate("/profile")
                }
            })
            .catch((err)=>
            {
                navigate("/register");
            })
        }
        else 
        {
            navigate("/register");
        }
        
    },[])
    return (
        <div className='register-container'>
            <form action="" onSubmit={handelSubmit}>
                <h1>Register</h1>
                <hr />
                <div className="form-group mt-3">
                    <label htmlFor="">Email</label>
                    <input type="email"  className='form-control mt-2' name='email' required  placeholder='@gmail.com' onChange={handelChange}/>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="">Password</label>
                    <input type="password"  className='form-control mt-2' name='password' required  placeholder='********' onChange={handelChange}/>
                </div>
                 <p className='mt-2 text-secondary'>Already register ? <span className='text-primary' style={{cursor:"pointer"}} onClick={()=>
                {
                    navigate("/login");
                }}>Login</span></p>
                <button type="submit" className='btn btn-primary mt-4'>submit</button>
                <button type="reset" className='btn btn-warning mt-4 ms-3'>reset</button>
            </form>
        </div>
    );
};

export default Register;