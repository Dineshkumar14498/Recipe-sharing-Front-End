import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { apiUrl } from '../api'

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // Toggle for password visibility
  const [rememberMe, setRememberMe] = useState(false) // State for Remember Me

  // Email and Password validation
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6 // Set a minimum password length requirement
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
    if (!validateEmail(email)) {
      setError("Invalid email address.")
      setIsLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.")
      setIsLoading(false)
      return
    }

    const endpoint = isSignUp ? 'signUp' : 'login';

    try {
      const res = await axios.post(apiUrl + `${endpoint}`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      }

      setIsOpen(); // Close the modal
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
          <input
            type="email"
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className='form-control'>
          <label>Password</label>
          <div className='password-input'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() => setShowPassword(prev => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <div className="form-control remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(prev => !prev)}
            />
            Remember Me
          </label>
        </div>

        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : (isSignUp) ? "Sign Up" : "Login"}
        </button>

        {error && <h6 className='error'>{error}</h6>}

        <br />
        <p onClick={() => setIsSignUp(prev => !prev)}>
          {isSignUp ? "Already have an account?" : "Create a new account"}
        </p>
      </form>
    </>
  )
}
