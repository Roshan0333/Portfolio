import { useState } from "react";
import logo from "../assets/Portfolio_logo.webp";
import cross from "../assets/cross.webp";
import portfolioAgent from "../assets/agent-logo.webp";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    const navListArray = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Experience",
            path: "/experience"
        },
        {
            name: "Education",
            path: "/education"
        },
        {
            name: "Project",
            path: "/project"
        },
        {
            name: "Certificate",
            path: "/certificate"
        },
         {
            name: "Contact Me",
            path: "/contact"
        },
    ]

    const handleMenu = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="bg-white mx-3 mt-3 h-16 flex items-center justify-between rounded-full md:mx-10 sm:m-3 py-2">
            <motion.div
                className="relative w-20 h-12 overflow-hidden rounded-full">
                <img
                    src={logo}
                    className="w-20 h-12 m-1 rounded-full"
                />
                <motion.div
                    className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    animate={{ left: ["-100%", "100%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        repeatDelay: 2
                    }}
                />
            </motion.div>
            <div className="flex-1 flex justify-end md:justify-center">
                <div className="md:hidden flex items-center">
                    {/* <img src={portfolioAgent} className="w-10 h-10 mr-3 rounded-full" /> */}
                    <motion.div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full">
                        <img src={portfolioAgent} className="rounded-full" />

                        <motion.div
                            className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            animate={{ left: ["-100%", "100%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "easeInOut",
                                duration: 2,
                                repeatDelay: 2
                            }}
                        />
                    </motion.div>
                    <div className="flex flex-col justify-between w-6 h-5 cursor-pointer mr-3" onClick={handleMenu}>
                        {!isOpen && <FaBars size={25} color="black" />}

                        {isOpen && <img src={cross} />}
                    </div>

                    {isOpen &&
                        <div className="fixed top-0 left-0 w-60 h-screen bg-white flex flex-col items-center mt-3 z-50 rounded-xl ml-3">
                            <img src={logo} className="w-20 h-12 m-1 rounded-full mt-3 cursor-pointer" />
                            {navListArray.map((item, index) => {
                                return <Link to={item.path} className="text-black mx-1 text-start w-full p-3 cursor-pointer hover:bg-black hover:text-white rounded-b-md" key={index}>{item.name}</Link>
                            })}
                        </div>}
                </div>

                <div className="hidden md:flex items-center gap-2 justify-center mr-3">
                    {navListArray.map((item, index) => {
                        return <Link to={item.path} className={`${(location.pathname === item.path) ? "text-white bg-black" : "text-black bg-white"} mr-1 cursor-pointer text-[15px] hover:bg-black hover:text-white rounded-full p-2`} key={index}>{item.name}</Link>
                    })}
                </div>

            </div>

            <motion.div className=" hidden md:flex relative w-12 h-12 mr-4 overflow-hidden rounded-full">
                <img
                    src={portfolioAgent}
                    className="m-1 mr-4 rounded-full cursor-pointer"
                />

                <motion.div
                    className="absolute top-0 left-[-120%] w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    animate={{ left: ["-120%", "120%"] }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
            </motion.div>
        </div>
    )
}

export default Navbar;