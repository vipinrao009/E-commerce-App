import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import{ toast} from 'react-hot-toast'

const Header = () => {
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate()

    async function handleLogout(){
        setAuth({
            ...auth,
            user:null,
            token:""
        })

        localStorage.removeItem("auth")
        await toast.success("Logout successfully...")
        navigate('/')
    }
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to="/" className="navbar-brand">
                    Ecommerce app
                </Link>
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                        Home
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/category" className="nav-link">
                        Category
                        </NavLink>
                    </li>

                    {!auth.user ? (
                        <>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                 Register
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                 Login
                                </NavLink>
                            </li>
                        </>
                    ): (
                        <>
                            <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {auth?.user?.name}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" href="#">
                                    Dashboard
                                </NavLink>
                                </li>
                               
                                <li>
                                <hr className="dropdown-divider" />
                                </li>

                                <li>
                                <NavLink onClick={handleLogout} to={'login'} className="dropdown-item">
                                  Logout
                                </NavLink>
                                </li>
                                
                            </ul>
                            </li>
                        </>
                    )}

                    <li className="nav-item">
                        <NavLink to="/cart" className="nav-link">
                        Cart (0)
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>

    </>
  )
}

export default Header
