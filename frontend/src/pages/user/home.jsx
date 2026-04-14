import Roshan from "../../assets/Roshan.webp"
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa"
import SkillCard from "../../cards/skillsCard";

function Home() {

    const skills = [
        "React.js",
        "Tailwind CSS",
        "HTML5",
        "CSS3",

        "Node.js",
        "Express.js",
        "REST APIs",
        "Authentication",

        "MongoDB",
        "Redis",
        "Supabase",


        "JavaScript",

        "Git",
        "GitHub",
        "Postman",
        "VS Code",
    ];

    const skillsCardList = [
        {
            category: "Frontend",
            items: [
                { name: "React.js" },
                { name: "Tailwind CSS" },
                { name: "HTML5" },
                { name: "CSS3" }
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js" },
                { name: "Express.js" },
                { name: "MongoDB" },
                { name: "REST API" }
            ]
        }
    ];

    const cardVariant = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.8, 0.25, 1]
            }
        }
    };

    return (
        <div className="h-full max-w-full overflow-x-hidden">
            <div className="max-w-full flex flex-col-reverse md:flex-row justify-around">
                <div className="flex-1 h-100 flex flex-col justify-center items-center text-start mx-5 mt-10">
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
                        <FaLinkedin color="#0A66C2" size={30} className="mr-6 cursor-pointer" />
                        <FaGithub size={30} className="mr-6 cursor-pointer" />
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

            <div className="overflow-hidden w-full h-15  mt-10 border-y-2 border-white">
                <motion.div
                    className="flex items-center gap-10 w-max h-full overflow-x-hidden"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {skills.map((item, index) => {
                        return <p className="font-bold whitespace-nowrap min-w-fit" key={index}>{item}</p>
                    })}

                    {skills.map((item, index) => {
                        return <h3 className="font-bold whitespace-nowrap min-w-fit" key={`duplicate ${index}`}>{item}</h3>
                    })}
                </motion.div>
            </div>

            <motion.div
                initial='hidden'
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className=" w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-10 mb-4 px-4">
                {skillsCardList.map((skill, index) => {
                    return <motion.div
                    key = {index}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView= "visible"
                    viewport={{once: false, margin: "-50px"}}
                    >
                        <SkillCard skills={skill} key={index} />
                    </motion.div>
                })}
            </motion.div>
        </div>
    )
}

export default Home;