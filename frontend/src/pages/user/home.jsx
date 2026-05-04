import Roshan from "../../assets/Roshan.webp"
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa"
import SkillCard from "../../cards/skillsCard";
import { fetchProfile } from "../../redux/thunk";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function Home() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [intro, setIntro] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [media, setMedia] = useState([]);
    const [skillsCardList, setSkillsCardList] = useState([])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

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


    const handleView = () => {
        if (!resume) return;
        window.open(resume, "_blank");
        setOpen(false);
    }

    const handleDownload = async () => {
        if (!resume) return;
        
        const response = await fetch(resume);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Roshan";
        a.click();
        URL.revokeObjectURL(url);
        setOpen(false)
    };

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutSide);
        return () => document.removeEventListener("mousedown", handleClickOutSide);
    }, [])

    useEffect(() => {
        ; (async () => {
            try {
                const result = await dispatch(fetchProfile()).unwrap();

                const profileData = result[0];

                if (profileData) {
                    setName(profileData.name || "");
                    setProfession(profileData.profession || "");
                    setIntro(profileData.introduction || "");
                    setProfileImage(profileData.profileImage || "");
                    setMedia(profileData.socialMediaLink || []);
                    setSkillsCardList(profileData.skill || []);
                    setResume(profileData.resume || null);
                }

            } catch (err) {
                console.log(err.message)
            }
        })()
    }, [dispatch]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="h-full max-w-full overflow-x-hidden hide-scrollbar">
            <div className="max-w-full flex flex-col-reverse md:flex-row justify-around">
                <div className="flex-1 h-100 flex flex-col justify-center items-center text-start mx-5 mt-10">
                    <span
                        className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {name}
                    </span>
                    <span className="text-5xl font-bold text-center pb-5 text-[#60A5FA] mt-3">{profession}</span>
                    <p className="text-[#D1D5DB] text-center">{intro}</p>

                    <div className="flex mt-5">
                        {media.map((item, index) => {
                            if (item.name === "Github") {
                                return <a href={item.link}><FaGithub size={30} className="mr-6 cursor-pointer" /></a>
                            }
                            else if (item.name === "Linkedin") {
                                return <a href={item.link}><FaLinkedin color="#0A66C2" size={30} className="mr-6 cursor-pointer" /></a>
                            }
                        })}
                        <div className="relative" ref={menuRef}>

                            {/* Your existing button style — just replaced <a> with button */}
                            <button
                                onClick={() => resume && setOpen(!open)}
                                className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full transition
          ${!resume ? "opacity-40 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"}`}
                            >
                                Resume
                            </button>

                            {/* Dropdown */}
                            {open && (
                                <div className="absolute top-full mt-2 left-0 bg-[#14072F] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 min-w-[150px]">

                                    <button
                                        onClick={handleView}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                                    >
                                        👁️ View
                                    </button>

                                    <div className="h-px bg-white/10" />

                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                                    >
                                        ⬇️ Download
                                    </button>

                                </div>
                            )}

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
                            src={profileImage ? profileImage : Roshan}
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
                className="w-full gap-6 mt-10 mb-4 px-4 items-start"
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
                {[...skillsCardList]
                    .sort((a, b) => b.items.length - a.items.length)
                    .map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-50px" }}
                        >
                            <SkillCard skills={skill} />
                        </motion.div>
                    ))}
            </motion.div>
        </div>
    )
}

export default Home;