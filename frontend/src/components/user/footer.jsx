import Logo from "../../assets/Portfolio_logo.webp";
import { FaLinkedin, FaGithub, FaEnvelope, FaMobile, FaAddressCard, FaHeart } from "react-icons/fa"

function Footer() {

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
        },]

    return (
        <div className="max-w-full p-10 bg-[#0B0B15] border-t border-[#2A2A40] mt-20 text-white">
            <div className="max-w-full flex flex-col md:flex-row">
                <div className="flex-1 ">
                    <div className="flex">
                        <img src={Logo} alt="Websites Logo" className="bg-black w-15 h-15 rounded-2xl" />
                        <div className="ml-4 text-left">
                            <p className="text-2xl font-bold text-[#8B5CF6]">Roshan Ansari</p>
                            <p className="">MERN Stack Developer</p>
                        </div>
                    </div>
                    <div className="text-left mt-4">
                        <p>I craft scalable, high-performance web applications with the MERN stack,
                            combining clean code, modern architecture, and exceptional user experience.</p>
                    </div>

                    <div className="flex mt-4 gap-2">
                        <a className="cursor-pointer"><FaLinkedin size={25} /></a>
                        <a className="cursor-pointer"><FaGithub size={25} /></a>
                        <a className="cursor-pointer"><FaEnvelope size={25} /></a>
                    </div>
                </div>

                <div className="flex-1 flex flex-col md:items-center text-left mt-6 md:mt-0 gap-3">
                    <h2 className="text-center underline">Navigation</h2>
                    <ul className="list-disc text-start pl-5 md:pl-0">
                        {navListArray.map((item, index) => {
                            return <li key={index} className="hover:text-[#8B5CF6] cursor-pointer">{item.name}</li>
                        })}
                    </ul>
                </div>

                <div className="flex-1 flex flex-col md:items-center text-left mt-6 md:mt-0 gap-3">
                    <h2 className="text-center underline">Contact</h2>
                    <div className="flex flex-col items-start">
                        <div className="flex md:justify-center items-center gap-2 cursor-pointer hover:text-[#8B5CF6]">
                            <FaEnvelope color="#8B5CF6"/>
                            <p>ra786roshanansari@gmail.com</p>
                        </div>
                        <div className="flex md:justify-center items-center gap-2 text-left cursor-pointer hover:text-[#8B5CF6]">
                            <FaMobile color="#8B5CF6"/>
                            <p>+91 8076521230</p>
                        </div>
                        <div className="flex md:justify-center items-center gap-2 cursor-pointer hover:text-[#8B5CF6]">
                            <FaAddressCard color="#8B5CF6"/>
                            <p>Faridabad, Haryana</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="border-t border-[#2A2A40] my-8"></div>

            <div className="flex flex-col md:flex-row mt-5">
                <p className="flex-1 text-left">&copy; 2026 Roshan Ansari. All rights reserved</p>
                <div className="flex-1 flex items-center md:justify-end gap-2">
                    <FaHeart color="#8B5CF6"/>
                    <p>Built with passion and purpose</p>
                </div>
            </div>
            
        </div>
    )
}

export default Footer