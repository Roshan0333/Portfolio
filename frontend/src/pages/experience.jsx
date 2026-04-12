import { CareerCard } from "../cards/careerCard";
import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

function Experience() {

    const experienceData = [
        {
            companyName: "Athenura",
            position: "MERN Stack Developer Intern",
            joiningDate: "Mar 2026",
            leavingDate: "Present",
            description: "Developing full-stack web applications using MongoDB, Express.js, React.js, Node.js, and Redis. Implementing Redis-based caching and session management to improve performance and scalability. Working on real-world problem solving with focus on innovation and learning.",
        },
        {
            companyName: "Graphura India Private Limited",
            position: "MERN Stack Developer Intern",
            joiningDate: "Dec 2025",
            leavingDate: "Mar 2026",
            description: "Built and maintained full-stack web applications using MERN stack in an agile environment. Designed RESTful APIs with secure authentication, integrated payment gateways and real-time features, and developed responsive React.js frontends. Collaborated with teams to deliver scalable solutions.",
        },
        {
            companyName: "MahaLaxmi Research and Services",
            position: "Market Research Analyst",
            joiningDate: "Jun 2025",
            leavingDate: "Dec 2025",
            description: "Conducted market research to identify trends and customer preferences. Analyzed datasets to generate business insights, created reports and presentations, and evaluated competitors to identify growth opportunities.",
        },
        {
            companyName: "Main Flow Services and Technologies",
            position: "Web Development Intern",
            joiningDate: "May 2024",
            leavingDate: "Jul 2024",
            description: "Developed responsive web interfaces for real-world projects. Strengthened frontend development skills and delivered features independently while collaborating with a team.",
        }
    ];

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.8, 0.25, 1]
            }
        }
    }

    return (
        <div className="relative w-[98%] md:w-[80%] flex flex-col items-center justify-center gap-4 p-5  m-auto">

            <div className="z-10 flex items-center w-full">
                <div className="border-t-4 border-[#14072F] w-13 ml-9 md:w-20 md:ml-12 lg:ml-12  shadow-[0_0_10px_#8B5CF6] overflow-hidden"></div>
                <div className="flex flex-col justify-center items-start mt-1">
                    <p className="text-4xl font-bold text-white">Experience</p>
                    <p>My Career Journey</p>
                </div>
            </div>

            <div className="absolute top-13 bottom-0 left-[53px] md:left-[65px] lg:left-[75px] w-[4px]
            bg-gradient-to-b from-[#14072F] via-[#3A1C71] to-[#6A3FD1] animate-[pulseGlow_5s_infinite]"></div>

            <div className="absolute top-13 bottom-0 left-[53px] md:left-[65px] lg:left-[75px] w-[4px] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-[#14072F] via-[#3A1C71] to-[#6A3FD1]"></div>
                <div className="absolute w-full h-[50px] top-0 bg-gradient-to-b from-[#6A3FD] via-[#3A1C71] to-[#14072F] animate-[flow_5s_infinite] z-10"></div>
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

                className="flex flex-col gap-2 md:gap-5"
            >
                {experienceData.map((item, index) => {
                    return <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: false, margin:"-50px"}}
                        className="flex items-center justify-center gap-2 md:gap-5 w-full">

                        <div className="z-10 h-18 w-18 md:w-24 md:h-24 flex-shrink-0 flex justify-center items-center rounded-full bg-gradient-to-r from-[#14072F] via-[#3A1C71] to-[#6A3FD1] shadow-[0_0_10px_#8B5CF6]">
                            <div className="w-13 h-13 md:w-18 md:h-18 flex justify-center items-center rounded-full bg-[#2A2A40] shadow-[inset_0_0_10px_#14072F, 0_0_10px_#6A3FD1]">
                                <FaBriefcase size={40} className="text-white p-1 rounded-full" />
                            </div>
                        </div>

                        <div>
                            <CareerCard data={item} key={index} />
                        </div>
                    </motion.div>
                })}
            </motion.div>
        </div>
    )
}

export default Experience;