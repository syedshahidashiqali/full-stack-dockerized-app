import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import routes from "../routes/routes";
import { getAccessToken } from "../Util/helpers";

export default function Navbar() {
  let token = getAccessToken();

  const [isActive, setActive] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    setActive(path);
  }, [isActive]);

  return (
    <div className="navbarWrapper sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center">
          <div className="d-flex">
            <Link
              className="navbar-brand"
              to={routes.home}
              onClick={() => setActive('/')}
            >
              <img
                className="img-fluid"
                src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
                alt="logo"
              />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link
                  to={routes.home}
                  onClick={() => setActive('/')}
                  aria-current="page"
                  className={isActive == '/' ? 'nav-link my-border' : 'nav-link'}
                >
                  Home
                </Link>
                {token && (
                  <Link
                    to={routes.myProfile}
                    onClick={() => setActive('my-profile')}
                    className={isActive.includes('profile') ? 'nav-link my-border' : 'nav-link'}
                  >
                    My Profile
                  </Link>
                )}
                <Link
                  to={routes.aboutUs}
                  onClick={() => setActive('about-us')}
                  className={isActive.includes('about') ? 'nav-link my-border' : 'nav-link'}
                >
                  About Us
                </Link>
                {!token && (
                  <>
                    <Link
                      to={routes.login}
                      onClick={() => setActive('login')}
                      className={isActive.includes('login') ? 'nav-link my-border' : 'nav-link'}
                    >
                      Login
                    </Link>
                    <Link
                      to={routes.signup}
                      onClick={() => setActive('signup')}
                      className={isActive.includes('signup') ? 'nav-link my-border' : 'nav-link'}
                    >
                      Signup
                    </Link>
                  </>
                )}
                {token && (
                  <Link
                    to={routes.login}
                    onClick={() => {
                      localStorage.clear();
                      setActive('login');
                    }}
                    className={isActive.includes('login') ? 'nav-link my-border d-none' : 'nav-link'}
                  >
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}