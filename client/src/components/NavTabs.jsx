import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from '../utils/auth'; // Assuming you have an auth utility for checking auth status
import "../css/logout.css";


function NavTabs() {
  const currentPage = useLocation().pathname;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn()); // Check if the user is logged in
  }, []);

  const handleLogout = () => {
    Auth.logout(); // Assuming you have a logout method in your auth utility
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page after logging out
  };

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      {isLoggedIn ? (
        <>
          <li className="nav-item">
            <button id="logoutBtn"
              onClick={handleLogout}
              className="nav-link"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link
              to="/Login"
              className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Signup"
              className={currentPage === '/Signup' ? 'nav-link active' : 'nav-link'}
            >
              Signup
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavTabs;
