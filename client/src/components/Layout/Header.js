import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to="/">
              <img
                src="/images/writoquotes.png" // Replace with the actual image file path
                alt="WritoQuotes Logo"
                style={{
                  width: '150px', // Adjust the width and height as needed
                  height: 'auto',
                }}
              />
            </Link>


          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: "#371F76" ,
                  fontWeight: 'bold',
                }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}
                    style={{ color: "#371F76" ,
                    fontWeight: 'bold',
                  }}
                    >
                      All Categories
                    </Link>
                  </li>
                  
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{ color: "#371F76" ,
                  fontWeight: 'bold',
                }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link"
                    style={{ color: "#371F76" ,
                    fontWeight: 'bold',
                  }}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link"
                    style={{ color: "#371F76" ,
                    fontWeight: 'bold',
                  }}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" ,
                    fontWeight: 'bold',
                    color: "#371F76" ,
                    }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          style={{ color: "#371F76" ,
                  fontWeight: 'bold',
                }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ color: "#371F76" ,
                  fontWeight: 'bold',
                }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item"
             
              >
                <NavLink to="/cart" className="nav-link"
                 style={{ color: "#371F76" ,
                 fontWeight: 'bold',
               }}
                 
                >
                  <Badge count={cart?.length} showZero offset={[10, -5]}
                  
                  >
                    
                  🛒
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
