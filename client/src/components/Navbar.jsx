import './navbar.css';

import {
  FaHome,
  FaUserAlt,
  FaUserPlus,
  FaPlus,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../features/auth/authSlice"


function Navbar({ setOpen }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <nav className='navbar'>
      <ul>
        <li onClick={() => setOpen(false)}>
          <Link to='/'>
            <FaHome />
            <span> accueil</span>
          </Link>
        </li>
        {!user ? (
          <>
            <li onClick={() => setOpen(false)}>
              <Link to='/login'>
                <FaUserAlt />
                <span> connexion</span>
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to='/register'>
                <FaUserPlus />
                <span> s'enregister</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => setOpen(false)}>
              <Link to='/create'>
                <FaPlus />
                <span> ajouter</span>
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <div className="logout" onClick={handleLogout}>
              <FaSignOutAlt />
                <span> Logout</span>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
