import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // Importer Link depuis react-router-dom
import logo from "/src/img/logo1.png";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen); 
  };

  const handleNavItemClick = (e, id, offset) => {
    e.preventDefault();
    const y = id === "home" ? 0 : document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleCreateAccountClick = () => {
    const offset = 40; // Adjust this value according to your layout
    const y = document.getElementById("signupsection").getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const navItems = [
    { label: "Home", href: "#", id: "home", offset: 0 },
    { label: "A propos", href: "#apropos", id: "apropos", offset: 60 },
    { label: "Evenements", href: "#evenements", id: "evenements", offset: 60 },
    { label: "Contact", href: "#contact", id: "contact", offset: 60 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 backdrop-blur-lg bg-blue-800 ">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-30 mr-2" src={logo} alt="Logo" />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} onClick={(e) => handleNavItemClick(e, item.id, item.offset)} className="text-white hover:text-gray-800 transition duration-300">{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {/* Rediriger vers la page de connexion */}
            <Link to="/signin" className="py-2 px-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
              Sign In
            </Link>
            <button className="py-2 px-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300" onClick={handleCreateAccountClick}>
              Create an account
            </button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-blue-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href} onClick={(e) => handleNavItemClick(e, item.id, item.offset)} className="text-white hover:text-blue-400 transition duration-300">{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              {/* Rediriger vers la page de connexion */}
              <Link to="/signin" className="py-2 px-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
                Sign In
              </Link>
              <button className="py-2 px-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300" onClick={handleCreateAccountClick}>
                Create an account
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
