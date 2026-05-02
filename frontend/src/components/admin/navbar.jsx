import ProfileImage from "../../assets/Roshan.webp";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from "../../assets/Portfolio_logo.webp";
import { useState } from "react";

function AdminNavbar() {

    const navLink = [
        { name: "Profile", path: "/admin/profile" },
        { name: "Project", path: "/admin/project" },
        { name: "Education", path: "/admin/education" },
        { name: "Experience", path: "/admin/experience" },
        { name: "Certificate", path: "/admin/certificate" },
        { name: "Inquire", path: "/admin/inquire" },
    ]

    const [open, setOpen] = useState(false);

    return (
        <div className="max-w-full md:w-[25%] md:h-screen flex flex-col justify-center items-center ml-2 border-[#5520b7] shadow-[0_0_10px_#5520b7] rounded-2xl">

            {/* Top Mobile Navbar */}
            <div className="relative w-[95%] flex justify-between md:hidden px-4 py-3 my-3 
            bg-gradient-to-r from-[#14072F] to-[#2a0b5c] 
            rounded-xl shadow-lg border border-white/10">

                <img src={Logo} className="w-10 h-10 rounded-full border border-white/20" alt="Website Logo" />

                {(!open)
                    ? <div className="flex items-center justify-center w-10 h-10 rounded-full 
                    bg-gradient-to-r from-purple-600 to-violet-500 shadow-md hover:scale-105 transition">
                        <FaBars
                            onClick={() => setOpen(prev => !prev)}
                            size={18}
                            color="#ffffff"
                        />
                    </div>
                    :
                    <div className="flex items-center justify-center w-10 h-10 rounded-full 
                    bg-gradient-to-r from-pink-600 to-purple-600 shadow-md hover:scale-105 transition">
                        <FaTimes
                            onClick={() => setOpen(prev => !prev)}
                            size={18}
                            color="#ffffff"
                        />
                    </div>}

            </div>

            {/* Sidebar */}
            <div className={`w-[60%] md:w-full h-screen ${open ? "block absolute z-100 top-0 left-0" : "hidden"}  md:block rounded-2xl`}>

                <div className="w-full h-screen flex flex-col justify-center items-center gap-4 px-3 
                bg-gradient-to-b from-[#6A3FD1] to-[#3b0f9c] 
                rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.25)] border border-white/10">

                    {/* Profile */}
                    <img 
                        src={ProfileImage} 
                        alt="Profile Image" 
                        className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg"
                    />

                    <div className="text-center">
                        <p className="text-xl font-semibold text-white tracking-wide">
                            Roshan Ansari
                        </p>
                        <p className="text-sm text-gray-200">
                            MERN Stack Developer
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-[85%] border-t border-white/20"></div>

                    {/* Nav Links */}
                    <div className="w-full">
                        <ul className="w-full flex flex-col gap-2">

                            {navLink.map((item, index) => {
                                return (
                                    <Link 
                                        to={item.path} 
                                        key={index}
                                        onClick={() => setOpen(false)}
                                        className="mx-2 rounded-xl 
                                        bg-[#14072F]/90 border border-white/10 
                                        hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-500 
                                        transition duration-300 shadow-md hover:shadow-purple-500/30"
                                    >
                                        <li className="p-3 text-white text-sm font-medium tracking-wide text-center">
                                            {item.name}
                                        </li>
                                    </Link>
                                )
                            })}

                        </ul>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AdminNavbar;