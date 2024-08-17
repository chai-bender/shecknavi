import { Link, useLocation } from 'react-router-dom';


function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">

      <li className="nav-item">
        <Link
          to="/"
          // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Login"
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/About' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Signup"
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/Signup' ? 'nav-link active' : 'nav-link'}
        >
          Signup
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
