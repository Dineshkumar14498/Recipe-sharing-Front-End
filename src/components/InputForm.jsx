import React, { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../api'

export default function InputForm({setIsOpen}) {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [isSignUp,setIsSignUp]=useState(false) 
   const [error,setError]=useState("")
   const [isLoading, setIsLoading] = useState(false)



   const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = isSignUp ? 'signUp' : 'login';
  
    try {
      const res = await axios.post( apiUrl +`${endpoint}`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsOpen();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
        <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <button type='submit' disabled={isLoading}>{ isLoading ? 'Loading...' :(isSignUp) ? "Sign Up": "Login"}</button><br></br>
          { (error!="") && <h6 className='error'>{error}</h6>}<br></br>
            <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Already have an account": "Create new account"}</p>
        </form>
    </>
  )
}