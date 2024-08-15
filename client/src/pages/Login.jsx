import React, {useState} from 'react';
import NavTabs from '../components/NavTabs';
import { Link } from 'react-router-dom';
import "../css/login.css";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
  }

  return (
    <div class="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <NavTabs />
        <Link to='/Login'/>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <br></br>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div><br></br>
      <button id="loginBtn" type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login;