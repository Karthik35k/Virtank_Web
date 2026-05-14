import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {

  const [currState,setCurrState] = useState("Login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const DEMO_USER_EMAIL = 'user@virtank.com'
  const DEMO_USER_PASSWORD = 'user123'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      if (currState === 'Login') {
        // Accept demo credentials without calling the API (useful when backend is not running)
        if (email === DEMO_USER_EMAIL && password === DEMO_USER_PASSWORD) {
          onLoginSuccess?.()
          setShowLogin(false)
          return
        }
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        if (!res.ok) {
          const data = await res.json().catch(()=>({}))
          setError(data?.error || 'Login failed')
          return
        }
        onLoginSuccess?.()
        setShowLogin(false)
        return
      }
      // For demo Sign Up, just accept and log the user in
      onLoginSuccess?.()
      setShowLogin(false)
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
      <div className="login-popup-title">
        <h2>{currState}</h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currState==="Login"?<></>:<input type="text" placeholder='Your name' required />}
        <input type="email" placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
      </div>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
    <button>{currState==="Sign Up"?"Create account":"Login"}</button>
    <div className="login-popup-condition">
      <input type="checkbox" required />
      <p>By continuing, I agree to the terms of use & <a href="/privacy-policy" target="_self">privacy policy</a>.</p>
    </div>
    {currState==="Login"
    ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
    :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
  }
    </form>
    </div>
  )
}

export default LoginPopup