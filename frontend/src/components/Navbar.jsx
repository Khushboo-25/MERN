import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to handle the toggler (whether navbar is open or closed)
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle navbar
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h3 className="navbar-brand" href="#">
          Employee Record Organizer
        </h3>

        {/* Toggler button that toggles navbar collapse */}
        <button
          className={`navbar-toggler ${isOpen ? "open" : ""}`}
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Add New
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link active" aria-current="page">
                Show All
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
