import Roshan from "../assets/Roshan.webp"
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa"

function Home() {
    return (
        <div className="max-w-full h-full flex flex-col-reverse md:flex-row justify-around  ">
            <div className="flex-1 h-100 flex flex-col justify-center items-center text-start ml-5 mt-10">
                <span
                    className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Roshan Ansari
                </span>
                <span className="text-5xl font-bold text-center pb-5 text-[#60A5FA] mt-3">MERN Stack Developer</span>
                <p className="text-[#D1D5DB] text-center">I’m Roshan Ansari, a MERN Stack Developer passionate about building smart
                    and innovative applications.
                    I have worked on projects like a Movie Recommendation System
                    and AI-based solutions, focusing on performance, scalability,
                    and user experience.</p>

                <div className="flex mt-5">
                    <FaLinkedin color="#0A66C2" size={30} className="mr-6 cursor-pointer"/>
                    <FaGithub size={30} className="mr-6 cursor-pointer"/>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full cursor-pointer hover:opacity-90 transition">
                        <p>Resume</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center mt-10">

                <div className="relative w-64 h-64 md:w-100 md:h-105 flex items-center justify-center">

                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "linear"
                        }}
                    />

                    <div className="absolute inset-[10px] bg-gray-900 rounded-full" />

                    <img
                        src={Roshan}
                        alt="Roshan"
                        className="absolute inset-[15px] w-[calc(100%-30px)] h-[calc(100%-30px)] object-cover rounded-full"
                    />

                </div>

            </div>
        </div>
    )
}

export default Home;