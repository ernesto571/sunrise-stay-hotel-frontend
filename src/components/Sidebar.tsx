import { NavLink } from "react-router-dom";
import { Clock, Mail, MapPin, Phone, X } from "lucide-react";
import { sidebarLinks } from "../constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      {/* Backdrop overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[70%] md:w-[50%]  bg-white border border-[#157c6e] shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col w-[98%] md:w-[94%] mx-auto gap-6 pt-6 px-4  text-gray-800">
          {/* Close button */}
          <button
            className="self-end bg-[#76be81] hover:bg-[#1c1c1c] rounded-full p-2 transition-colors ease-in-out"
            onClick={onClose}>
            <X size={20} color="white" />
          </button>

          {/* Sidebar Links */}
          <div className="flex flex-col mt-4">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={ ({isActive}) => `border-b hover:text-[#76be81] hover:translate-x-3 border-gray-200 font-semibold text-[0.9rem] tracking-wide py-3 ease-in duration-100
                            ${isActive ? "text-[#76be81] " : ""} `}
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            ))}

            {/* contact info */}
            <div className="mt-4 font-extralight ">
                <h3 className="text-[1.5rem]">Contact Info</h3>

                <span className="flex mt-5 text-[0.9rem] gap-2 items-center">
                    <MapPin size={50} className="text-[#76be81] "/>
                    <p>Electric Brixton, Town Hall Parade, Brixton Hill, London SW2 1RJ, United Kingdom </p>
                </span>

                <span className="flex mt-6 text-[0.9rem] gap-2 items-center">
                    <Mail size={20} className="text-[#76be81] "/>
                    <p>sunrise-stayHotel@gmail.com</p>
                </span>

                <span className="flex mt-6 text-[0.9rem] gap-2 items-center">
                    <Clock size={20} className="text-[#76be81] "/>
                    <p>Mod-friday, 08am -08pm</p>
                </span>

                <span className="flex mt-6 text-[0.9rem] gap-2 items-center">
                    <Phone size={20} className="text-[#76be81] "/>
                    <p>+234 802 471 5876</p>
                </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;