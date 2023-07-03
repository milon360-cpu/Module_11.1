import React,{useEffect, useState} from 'react';
import  {useNavigate} from 'react-router-dom'
import './Login.css'
const Login = () => {
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({email:'',password:''});
    const handelChange = (e)=>
    {
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }
    const handelSubmit = (e)=>
    {
        e.preventDefault();
        fetch("http://localhost:5000/login/user",
        {
            method : "POST",
            headers  :
            {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(loginData)
        })
        .then((response)=> response.json())
        .then((data)=>
        {
            if(data.success)
            {
                navigate("/profile");
                console.log(data.data);
                localStorage.setItem("token",data.data.token);
            }
            else 
            {
                console.log(data);
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
                navigate("/login");
            })
        }
        else 
        {
            navigate("/login");
        }
        
    },[])
    return (
        <div className='login-container'>
            <form action="" onSubmit={handelSubmit}>
                <h1>Login</h1>
                <hr />
                <div className="form-group mt-3">
                    <label htmlFor="">Email</label>
                    <input type="email"  className='form-control mt-2' name='email' required  placeholder='@gmail.com' onChange={handelChange}/>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="">Password</label>
                    <input type="password"  className='form-control mt-2' name='password' required  placeholder='********' onChange={handelChange}/>
                </div>
                 <p className='mt-2 text-secondary'> register not yet ? <span className='text-primary' style={{cursor:"pointer"}} onClick={()=>
                {
                    navigate("/register");
                }}>Register</span></p>
                <button type="submit" className='btn btn-primary mt-4'>submit</button>
                <button type="reset" className='btn btn-warning mt-4 ms-3'>reset</button>
            </form>
        </div>
    );
};

export default Login;