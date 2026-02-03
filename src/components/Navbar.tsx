import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { navLinks } from "../constants";

function Navbar() {
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
            ${scrolled ? "backdrop-blur shadow-lg bg-white" : "text-white bg-inherit"}
        `}
      >
        <div className="flex justify-between items-center w-[90%] mx-auto mt-2 py-2">
          {/* Logo and name */}
          <Link to="/" className="flex gap-4 items-center">
            <img src="/logo_01.png" alt="Logo" className="h-8 w-auto" />
            <h1 className="hidden lg:block text-base lg:text-[1.3rem] font-serif font-light">
              SUNRISE-STAY HOTEL
            </h1>
          </Link>

          {/* links */}
          <span className="hidden lg:flex gap-9 justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={ ({isActive}) => ` hover:text-[#76be81] font-semibold text-[0.9rem] tracking-wide ease-in duration-100
                ${isActive ? "text-[#76be81] " : ""} `}
              >
                {link.label}
              </NavLink>
            ))}
          </span>

          {/* signin and bookings */}
          <section className="flex items-center gap-4">
            <div className="flex items-center gap-6">
              {isSignedIn ? (
                <>
                  <NavLink to="/my-bookings" className={ ({isActive}) => `hidden lg:flex hover:text-[#76be81] border-gray-200 text-[0.9rem] tracking-wide ease-in duration-100
                            ${isActive ? "text-[#76be81] " : ""} `}>
                    My Bookings
                  </NavLink>
                  <UserButton />
                </>
              ) : (
                <NavLink to="/sign-in" className={ ({isActive}) => `hover:text-[#76be81] border-gray-200 text-[0.9rem] tracking-wide ease-in duration-100
                ${isActive ? "text-[#76be81] " : ""} `}>
                  Sign In
                </NavLink>
              )}
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className=" lg:hidden hover:bg-[#76be81] hover:text-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </section>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

export default Navbar;