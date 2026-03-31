import { useState } from "react";
import logo from "../assets/Portfolio_logo.webp";
import cross from "../assets/cross.webp";
import portfolioAgent from "../assets/agent-logo.webp";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const navListArray = [
        {
            name: "Home",
            path:"/"
        },
        {
            name: "Experience",
            path:"/experience"
        },
        {
            name: "Education",
            path:"/education"
        },
        {
            name: "Project",
            path:"/project"
        },
        {
            name: "Certificate",
            path:"/certificate"
        },
    ]

    const handleMenu = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="bg-white mx-3 mt-3 h-16 flex items-center justify-between rounded-full md:mx-10 sm:m-3 py-2">
            <img src={logo} className="w-20 h-12 m-1 rounded-full" />
            <div className="flex-1 flex justify-end md:justify-center">
                <div className="md:hidden flex items-center">
                    <img src={portfolioAgent} className="w-10 h-10 mr-3 rounded-full"/>
                    <div className="flex flex-col justify-between w-6 h-5 cursor-pointer mr-3" onClick={handleMenu}>
                        {!isOpen && <FaBars size={25} color="black"/>}

                        {isOpen && <img src={cross}/>}
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
                        return <Link to={item.path} className="text-black mr-1 cursor-pointer hover:bg-black hover:text-white rounded-full p-2" key={index} >{item.name}</Link>
                    })}
                </div>

            </div>

            <img src={portfolioAgent} className="hidden md:flex w-15 h-12 m-1 mr-4 rounded-full cursor-pointer" />
        </div>
    )
}

export default Navbar;