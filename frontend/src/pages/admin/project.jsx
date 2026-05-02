import {
    FaBriefcase, FaGithub, FaChrome, FaStar, FaRegStar, FaEye, FaEyeSlash, FaTrash, FaCode,
    FaExternalLinkAlt,
    FaCalendarAlt,
    FaUserTie,
    FaTimes,
    FaArrowAltCircleLeft,
    FaCloudUploadAlt
} from "react-icons/fa";
import demo from "../../assets/default.webp"
import { useState } from "react";
import { postService } from "../../service/axios"

export function Project() {

    const projectData = [
        {
            projectName: "Developer Portfolio",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
            durationTime: new Date("2024-05-20"),
            role: "Full Stack Developer",
            shortBrifing: "A modern portfolio website to showcase projects and skills.",
            description:
                "Built a fully responsive developer portfolio website with dark theme UI, animations, project showcase, education timeline, certificate section, and contact form integration.",

            section: [
                {
                    image: "/images/portfolio-home.png",
                    description: "Hero section with introduction and social links."
                },
                {
                    image: "/images/portfolio-project.png",
                    description: "Projects section displaying featured projects."
                },
                {
                    image: "/images/portfolio-contact.png",
                    description: "Contact section with inquiry form."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/portfolio"
                },
                {
                    name: "Live Demo",
                    link: "https://portfolio-demo.vercel.app"
                }
            ],

            status: true,
            faviourate: true
        },

        {
            projectName: "E-Commerce Platform",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
            durationTime: new Date("2024-02-15"),
            role: "Full Stack Developer",
            shortBrifing: "Complete online shopping platform.",
            description:
                "Developed an e-commerce platform with product listing, cart management, secure payment integration, and admin dashboard.",

            section: [
                {
                    image: "/images/ecommerce-home.png",
                    description: "Landing page with product highlights."
                },
                {
                    image: "/images/ecommerce-cart.png",
                    description: "Shopping cart and checkout flow."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/ecommerce"
                },
                {
                    name: "Live Demo",
                    link: "https://shop-demo.vercel.app"
                }
            ],

            status: true,
            faviourate: false
        },

        {
            projectName: "Task Management App",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["React", "Firebase", "Tailwind CSS"],
            durationTime: new Date("2023-12-10"),
            role: "Frontend Developer",
            shortBrifing: "Task management system with real-time updates.",
            description:
                "Built a productivity app where users can create tasks, set priorities, and manage deadlines with real-time updates.",

            section: [
                {
                    image: "/images/task-dashboard.png",
                    description: "Task dashboard overview."
                },
                {
                    image: "/images/task-board.png",
                    description: "Kanban board for task tracking."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/task-manager"
                }
            ],

            status: false,
            faviourate: false
        },

        {
            projectName: "Movie Recommendation System",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["Python", "Machine Learning", "Flask"],
            durationTime: new Date("2023-08-22"),
            role: "ML Developer",
            shortBrifing: "AI-powered movie recommendation system.",
            description:
                "Created a recommendation engine using machine learning algorithms that suggests movies based on user preferences.",

            section: [
                {
                    image: "/images/movie-home.png",
                    description: "Homepage with movie suggestions."
                },
                {
                    image: "/images/movie-result.png",
                    description: "Recommendation results page."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/movie-recommendation"
                }
            ],

            status: true,
            faviourate: true
        }, {
            projectName: "Developer Portfolio",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
            durationTime: new Date("2024-05-20"),
            role: "Full Stack Developer",
            shortBrifing: "A modern portfolio website to showcase projects and skills.",
            description:
                "Built a fully responsive developer portfolio website with dark theme UI, animations, project showcase, education timeline, certificate section, and contact form integration.",

            section: [
                {
                    image: "/images/portfolio-home.png",
                    description: "Hero section with introduction and social links."
                },
                {
                    image: "/images/portfolio-project.png",
                    description: "Projects section displaying featured projects."
                },
                {
                    image: "/images/portfolio-contact.png",
                    description: "Contact section with inquiry form."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/portfolio"
                },
                {
                    name: "Live Demo",
                    link: "https://portfolio-demo.vercel.app"
                }
            ],

            status: true,
            faviourate: true
        },

        {
            projectName: "E-Commerce Platform",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
            durationTime: new Date("2024-02-15"),
            role: "Full Stack Developer",
            shortBrifing: "Complete online shopping platform.",
            description:
                "Developed an e-commerce platform with product listing, cart management, secure payment integration, and admin dashboard.",

            section: [
                {
                    image: "/images/ecommerce-home.png",
                    description: "Landing page with product highlights."
                },
                {
                    image: "/images/ecommerce-cart.png",
                    description: "Shopping cart and checkout flow."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/ecommerce"
                },
                {
                    name: "Live Demo",
                    link: "https://shop-demo.vercel.app"
                }
            ],

            status: true,
            faviourate: false
        },

        {
            projectName: "Task Management App",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["React", "Firebase", "Tailwind CSS"],
            durationTime: new Date("2023-12-10"),
            role: "Frontend Developer",
            shortBrifing: "Task management system with real-time updates.",
            description:
                "Built a productivity app where users can create tasks, set priorities, and manage deadlines with real-time updates.",

            section: [
                {
                    image: "/images/task-dashboard.png",
                    description: "Task dashboard overview."
                },
                {
                    image: "/images/task-board.png",
                    description: "Kanban board for task tracking."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/task-manager"
                }
            ],

            status: false,
            faviourate: false
        },
        {
            projectName: "Developer Portfolio",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
            durationTime: new Date("2024-05-20"),
            role: "Full Stack Developer",
            shortBrifing: "A modern portfolio website to showcase projects and skills.",
            description:
                "Built a fully responsive developer portfolio website with dark theme UI, animations, project showcase, education timeline, certificate section, and contact form integration.",

            section: [
                {
                    image: "/images/portfolio-home.png",
                    description: "Hero section with introduction and social links."
                },
                {
                    image: "/images/portfolio-project.png",
                    description: "Projects section displaying featured projects."
                },
                {
                    image: "/images/portfolio-contact.png",
                    description: "Contact section with inquiry form."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/portfolio"
                },
                {
                    name: "Live Demo",
                    link: "https://portfolio-demo.vercel.app"
                }
            ],

            status: true,
            faviourate: true
        },

        {
            projectName: "E-Commerce Platform",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
            durationTime: new Date("2024-02-15"),
            role: "Full Stack Developer",
            shortBrifing: "Complete online shopping platform.",
            description:
                "Developed an e-commerce platform with product listing, cart management, secure payment integration, and admin dashboard.",

            section: [
                {
                    image: "/images/ecommerce-home.png",
                    description: "Landing page with product highlights."
                },
                {
                    image: "/images/ecommerce-cart.png",
                    description: "Shopping cart and checkout flow."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/ecommerce"
                },
                {
                    name: "Live Demo",
                    link: "https://shop-demo.vercel.app"
                }
            ],

            status: true,
            faviourate: false
        },

        {
            projectName: "Task Management App",
            homeImage: "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            technology: ["React", "Firebase", "Tailwind CSS"],
            durationTime: new Date("2023-12-10"),
            role: "Frontend Developer",
            shortBrifing: "Task management system with real-time updates.",
            description:
                "Built a productivity app where users can create tasks, set priorities, and manage deadlines with real-time updates.",

            section: [
                {
                    image: "/images/task-dashboard.png",
                    description: "Task dashboard overview."
                },
                {
                    image: "/images/task-board.png",
                    description: "Kanban board for task tracking."
                }
            ],

            socialMedia: [
                {
                    name: "GitHub",
                    link: "https://github.com/roshan/task-manager"
                }
            ],

            status: false,
            faviourate: false
        },
    ];

    const [selectProject, setSelectProject] = useState(projectData[0]);
    const [projectFlag, setProjectFlag] = useState(false);
    const [selectedIndex, setIndex] = useState(0);
    const [formFlag, setFormFlag] = useState(false);

    const handleSelectProject = (index) => {
        setSelectProject(projectData[index]);
        setIndex(index)
    }

    const handleProjectDetail = () => {
        setProjectFlag(prev => !prev)
    }

    const handleFormFlag = () => {
        setFormFlag(prev => !prev)
    }

    return (
        <div className="w-full h-screen flex flex-col gap-2 p-2 bg-[#14072F] rounded-2xl relative">

            {formFlag &&
                <div className="w-full h-full fixed inset-0 z-[9999]  backdrop-blur-sm bg-black/30">
                    <div className="w-full h-screen flex items-center justify-center overflow-auto">
                        <ProjectForm flag={handleFormFlag} />
                    </div>
                </div>}

            <div className="flex items-center justify-between bg-[#311361] p-2 rounded-xl">
                <div className="flex items-center gap-2 text-left">
                    <div className="p-2 bg-[#1e0949] border-2 border-[#a987ec] rounded-full"><FaBriefcase className="text-3xl text-[#a987ec] p-1" /></div>
                    <div>
                        <p className="text-2xl text-white">Project</p>
                        <p className="text-[16px]">Manage all your project and details</p>
                    </div>
                </div>

                <button
                    onClick={handleFormFlag}
                    className="text-white text-[15px] px-3 py-2 border-2 border-[#7330de] bg-gradient-to-r from-[#14072F] to-[#1e0949] rounded-lg shadow-[0_0_20px_#14072F] hover:scale-105 transition">
                    + Add New Project
                </button>
            </div>

            <div className="w-full flex-1 flex gap-2 p-2 overflow-hidden">
                <div className="h-screen overflow-y-scroll hide-scrollbar flex-1 flex flex-col gap-2 lg:p-2 overflow-y-scroll">
                    {projectData.map((item, index) => {
                        return <div className={`cursor-pointer w-full flex gap-2 text-[16px] p-2 rounded-lg ${(selectedIndex === index) ? "bg-[#4e2295]" : "bg-[#311361]"} hover:bg-[#1f0943] transition`} onClick={() => {
                            handleSelectProject(index);
                            handleProjectDetail();
                        }}>
                            <ProjectCard item={item} key={index} />
                        </div>
                    })}
                </div>

                <div
                    className={`w-full lg:flex-2 ${projectFlag ? "block" : "hidden"
                        } lg:block bg-[#050816] rounded-2xl text-white p-4 overflow-y-auto`}
                >
                    <ProjectDetails project={selectProject} close={handleProjectDetail} />
                </div>
            </div>
        </div>
    )
}

function ProjectCard({ item }) {
    return (
        <div className="w-full flex gap-2 text-[16px]" >
            <img className="w-[150px] h-[100px] rounded-lg" src={item.homeImage} alt={item.projectName} />
            <div className="w-full flex-1 flex flex-col items-start justify-between text-left">
                <div>
                    <p>{item.projectName}</p>
                    <p>{item.role}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-1 ">
                        <div className={`${item.status ? "bg-green-300 text-green-700 border-green-700" : "bg-red-400 text-red-600 border-red-700"} px-2 rounded-2xl border-2`}>
                            {item.status ? <p>Active</p> : <p>Inactive</p>}
                        </div>
                        {item.faviourate ? <FaStar className="text-[#ffc20b]" /> : <FaRegStar />}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`${item.status ? "bg-green-300 text-green-700 border-green-700" : "bg-red-400 text-red-600 border-red-700"} py-1 px-2 rounded-lg border-2`}>
                            {item.status ? <FaEye /> : <FaEyeSlash />}
                        </div>
                        <div className="bg-red-400 text-red-600 border-red-700 py-1 px-2 rounded-lg border-2">
                            <FaTrash />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectDetails({ project, close }) {
    return (
        <div className="w-full h-full overflow-y-scroll hide-scrollbar border border-violet-500/20 rounded-2xl bg-[#0B0F2A]/80 backdrop-blur-lg shadow-[0_0_20px_rgba(139,92,246,0.2)] p-5">

            <div className="w-full flex items-center justify-end block md:hidden" onClick={close}>
                <FaTimes />
            </div>

            <div className="w-full p-2 gap-2">
                <div className="w-full h-[200px] rounded-xl overflow-hidden border border-violet-500/20">
                    <img
                        src={project.homeImage}
                        alt={project.projectName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex justify-between items-start gap-3 flex-wrap">

                    <div className="flex items-center gap-2 flex-wrap text-left">
                        <div className="flex items-center gap-2">
                            <p className="text-4xl font-bold break-words leading-tight">
                                {project.projectName}
                            </p>
                            {project.faviourate ? (
                                <FaStar className="text-yellow-400" />
                            ) : (
                                <FaRegStar className="text-gray-400" />
                            )}
                        </div>
                        <p className="text-gray-300 text-[20px]">
                            {project.shortBrifing}
                        </p>
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-violet-500 rounded-lg text-violet-400 hover:bg-violet-500/20">
                                Edit
                            </button>

                            <button className="px-4 py-2 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/20">
                                <FaTrash />
                            </button>
                        </div>

                        <div className="flex gap-3 flex-wrap items-center">
                            <span
                                className={`px-4 py-1 rounded-full text-sm ${project.status
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {project.status ? "Active" : "Inactive"}
                            </span>

                            {project.faviourate && (
                                <span className="px-4 py-1 rounded-full bg-violet-500/20 text-violet-400 text-sm">
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-hidden space-y-5">


                <div className="grid md:grid-cols-2 gap-5 pt-4 border-t border-violet-500/10 text-left">

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-400 mb-2">TECHNOLOGY</p>
                        <div className="flex flex-wrap gap-2">
                            {project.technology.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-lg text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <p className="text-sm text-gray-400 mb-2">STATUS</p>
                        <div className="flex items-center gap-2 text-green-400">
                            {project.status ? <FaEye /> : <FaEyeSlash />}
                            <span>{project.status ? "Active" : "Hidden"}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-violet-500/10">
                        <p className="text-sm text-gray-400 mb-2">ROLE</p>
                        <div className="flex items-center gap-2">
                            <FaUserTie className="text-violet-400" />
                            {project.role}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-violet-500/10">
                        <p className="text-sm text-gray-400 mb-2">DURATION</p>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-violet-400" />
                            {new Date(project.durationTime).toDateString()}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-violet-500/10">
                        <p className="text-sm text-gray-400 mb-2">DESCRIPTION</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-violet-500/10">
                        <p className="text-sm text-gray-400 mb-3">SOCIAL MEDIA</p>

                        <div className="space-y-3">
                            {project.socialMedia.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 text-violet-400 hover:text-white"
                                >
                                    {item.name === "GitHub" ? (
                                        <FaGithub />
                                    ) : (
                                        <FaExternalLinkAlt />
                                    )}

                                    <div>
                                        <p>{item.name}</p>
                                        <p className="text-xs text-gray-400 break-all">
                                            {item.link}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-violet-500/10 pt-6">
                <h2 className="text-lg font-semibold mb-5">
                    PROJECT SECTIONS
                </h2>

                <div className="grid md:grid-cols-3 gap-5">
                    {project.section.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#11152e] rounded-xl overflow-hidden border border-violet-500/10"
                        >
                            <img
                                src={item.image}
                                alt="section"
                                className="w-full h-40 object-cover"
                            />

                            <div className="p-4">
                                <p className="font-medium mb-2">
                                    Section {index + 1}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

function ProjectForm({ flag }) {
    const [technology, setTechnology] = useState([])
    const [projectSection, setProjectSection] = useState([]);
    const [mediaSection, setMediaSection] = useState([])
    const [homeImage, setHomeImage] = useState(null);
    const [homeImagefile, setHomeImagefile] = useState(null);
    const [projectName, setProjectName] = useState(null);
    const [role, setRole] = useState(null)
    const [briefing, setBriefing] = useState(null);
    const [description, setDescription] = useState(null);
    const [techValue, setTechValue] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [liveStatus, setLiveStatus] = useState(true);
    const [favouriteStatus, setFavouriteStatus] = useState(true)


    const addTech = () => {

        if (techValue) {
            const updatedTech = [
                ...technology,
                techValue
            ]
            setTechnology(updatedTech)
            setTechValue("")
        }
        else {
            alert("Please Enter Value")
        }
    }

    const deleteTech = (deleteIndex) => {
        const updatedTech = technology.filter((_, index) => index !== deleteIndex);
        setTechnology(updatedTech)
    }

    const handleAddMediaSection = () => {
        setMediaSection([
            ...mediaSection,
            {
                name: "",
                link: ""
            }
        ])
    }

    const handleAddProjectSection = () => {
        setProjectSection([
            ...projectSection,
            {
                image: "",
                description: ""
            }
        ])
    }

    const handleDeleteProjectSection = (deleteIndex) => {
        const updatedSection = projectSection.filter(
            (_, index) => index !== deleteIndex
        )

        setProjectSection(updatedSection)
    }

    const handleDeleteMediaSection = (deleteIndex) => {
        const updatedMedia = mediaSection.filter(
            (_, index) => index !== deleteIndex
        );

        setMediaSection(updatedMedia)
    }

    const handleHomeImage = (e) => {
        const selectImage = e.target.files[0];

        if (selectImage) {
            setHomeImagefile(selectImage);
            setHomeImage(URL.createObjectURL(selectImage))
        }
    }

    const handleSectionImage = (e, index) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const updatedSections = [...projectSection];
            updatedSections[index].image = selectedImage;
            setProjectSection(updatedSections);
        }
    }


    const checkValidation = () => {
        if (!projectName || !role || !description || !briefing || !homeImage || technology.length === 0 || projectSection.length === 0 || mediaSection.length === 0 || !startDate || !endDate) {
            alert("Fill the all required field");
        }
        else {
            addProject();
        }
    }

    const addProject = async () => {
        try {
            const image = [homeImagefile];

            for (let i = 0; i < projectSection.length; i++) {
                image.push(projectSection[i].image)
            }

            console.log(image)

            const descriptionArr = projectSection.map((item) => item.description);

            const start = new Date(startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            })

            const end = new Date(endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            })

            const durationTime = {
                start: start,
                end: end
            }

            const formData = new FormData();

            formData.append("projectName", projectName);
            formData.append("role", role);
            formData.append("shortBrifing", briefing);
            formData.append("description", description);
            formData.append("status", liveStatus);
            formData.append("faviourate", favouriteStatus);
            formData.append("technology", JSON.stringify(technology));
            formData.append("section", JSON.stringify(descriptionArr));
            formData.append("socialMedia", JSON.stringify(mediaSection)); 
            formData.append("durationTime", JSON.stringify(durationTime)); 
            image.forEach((file) => {
                formData.append("Project", file);
            });


            const res = await postService(
                "/portfolio/project/add",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.statusCode === 200) {
                alert(res.message);
                setBriefing(null);
                setDescription(null);
                setEndDate(null);
                setStartDate(null);
                setMediaSection([]);
                setProjectName(null);
                setProjectSection([]);
                setRole(null);
                setHomeImage(null);
                setHomeImagefile(null);
                setTechnology([]);

                flag();
                return
            }

            if (res.fetchMessage) {
                alert(res.message);
                return
            }
            else {
                console.log(res.message);
                return
            }

        }
        catch (err) {
            console.log(err.message);
            return
        }
    }

    return (
        <div className="w-full h-screen bg-[#05010d] text-white p-6 overflow-auto hide-scrollbar rounded-b-2xl">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 text-left">

                <div className="flex items-center gap-4">
                    <FaArrowAltCircleLeft className="text-3xl text-violet-500 cursor-pointer" onClick={flag} />

                    <div>
                        <p className="text-2xl font-semibold">Add New Project</p>
                        <p className="text-sm text-gray-400">
                            Fill in the details to showcase your project
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={flag}
                        className="px-5 py-2 border border-violet-500/20 rounded-lg hover:bg-violet-500/10">
                        Cancel
                    </button>

                    <button
                        onClick={checkValidation}
                        className="px-5 py-2 bg-violet-600 rounded-lg hover:bg-violet-700">
                        Save Project
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 text-left">

                <div className="space-y-6">

                    <div className="bg-[#0B0618] border border-violet-500/20 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-5">Basic Information</h2>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="mb-2 text-sm">Project Name *</p>
                                <input
                                    type="text"
                                    value={projectName}
                                    required
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="Enter project name"
                                    className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3 outline-none"
                                />
                            </div>

                            <div>
                                <p className="mb-2 text-sm">Role *</p>
                                <input
                                    type="text"
                                    value={role}
                                    required
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Your role in project"
                                    className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="mb-2 text-sm">Short Briefing *</p>
                            <input
                                type="text"
                                value={briefing}
                                required
                                onChange={(e) => setBriefing(e.target.value)}
                                placeholder="Enter short briefing"
                                className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3 outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-2 text-sm">Description *</p>
                            <textarea
                                rows="5"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write detailed description..."
                                className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3 outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-[#0B0618] border border-violet-500/20 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Project Image</h2>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm mb-2">Home Image *</p>

                            <label className="border-2 border-dashed border-violet-500/30 rounded-xl p-4 flex">
                                <div className="flex-1 flex flex-col items-center justify-center cursor-pointer">
                                    <FaCloudUploadAlt className="text-4xl text-violet-500 mb-3" />
                                    <p className="text-gray-400">Click to upload image</p>

                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleHomeImage(e)} />
                                </div>

                                <img src={homeImage ? homeImage : demo} className="flex-1 h-50 rounded-2xl" alt="Home Image" />
                            </label>
                        </div>
                    </div>

                    <div className="bg-[#0B0618] border border-violet-500/20 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Technology Used</h2>

                        <div className="flex gap-3 mb-4">
                            <input
                                type="text"
                                placeholder="Add technology"
                                value={techValue}
                                onChange={(e) => setTechValue(e.target.value)}
                                className="flex-1 bg-transparent border border-violet-500/20 rounded-lg p-3 outline-none"
                            />

                            <button
                                onClick={addTech}
                                className="px-5 bg-violet-600 rounded-lg">
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {technology.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-violet-500/20 px-3 py-2 rounded-full"
                                >
                                    <p className="text-sm">{item}</p>
                                    <FaTimes className="cursor-pointer text-sm" onClick={() => deleteTech(index)} />
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <p className="mb-2 text-sm">Start Date</p>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <p className="mb-2 text-sm">End Date</p>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">


                    <div className="bg-[#0B0618] border border-violet-500/20 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Project Sections</h2>

                        <div className="space-y-4 h-80 overflow-y-scroll">
                            {projectSection.map((section, index) => (
                                <div
                                    key={index}
                                    className="border border-violet-500/20 rounded-lg p-4 flex flex-col items-center md:flex-row gap-4"
                                >
                                    {/* Section Image */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm mb-2">Section Image</p>
                                        <label className="cursor-pointer">
                                            <img
                                                src={section.image ? URL.createObjectURL(section.image) : demo}
                                                alt=""
                                                className="w-32 h-20 object-cover rounded-lg"
                                            />

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleSectionImage(e, index)}
                                            />
                                        </label>
                                    </div>

                                    {/* Description */}
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="text-sm mb-2">Description</p>
                                        <textarea
                                            rows="3"
                                            value={section.description}
                                            onChange={(e) => {
                                                const updatedSections = [...projectSection];
                                                updatedSections[index].description = e.target.value;
                                                setProjectSection(updatedSections);
                                            }}
                                            placeholder="Enter section description"
                                            className="w-full h-20 bg-transparent border border-violet-500/20 rounded-lg p-3"
                                        />
                                    </div>

                                    {/* Delete */}
                                    <FaTrash
                                        onClick={() => handleDeleteProjectSection(index)}
                                        className="text-red-500 cursor-pointer mt-8"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleAddProjectSection}
                            className="w-full mt-4 border border-violet-500/20 py-3 rounded-lg text-violet-400 hover:bg-violet-500/10"
                        >
                            + Add New Section
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="bg-[#0B0618] border border-violet-500/20 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>

                        <div className="space-y-4 h-60 overflow-y-scroll">
                            {mediaSection.map((section, index) => (
                                <div
                                    key={index}
                                    className="border border-violet-500/20 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                                >
                                    {/* Section Image */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm mb-2">Name</p>
                                        <input
                                            value={section.name || ""}
                                            type="text"
                                            placeholder="Enter media name"
                                            onChange={(e) => {
                                                const updatedMedia = [...mediaSection];
                                                updatedMedia[index].name = e.target.value;
                                                setMediaSection(updatedMedia)
                                            }}
                                            className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="flex-1 flex flex-col gap-1">
                                        <p className="text-sm mb-2">Link</p>

                                        <input
                                            rows="3"
                                            value={section.link || ""}
                                            onChange={(e) => {
                                                const updatedMedia = [...mediaSection];
                                                updatedMedia[index].link = e.target.value;
                                                setMediaSection(updatedMedia)
                                            }}
                                            placeholder="Enter media link"
                                            className="w-full bg-transparent border border-violet-500/20 rounded-lg p-3"
                                        />
                                    </div>

                                    {/* Delete */}
                                    <FaTrash
                                        onClick={() => handleDeleteMediaSection(index)}
                                        className="text-red-500 cursor-pointer mt-8"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleAddMediaSection}
                            className="w-full mt-4 border border-violet-500/20 py-3 rounded-lg text-violet-400 hover:bg-violet-500/10">
                            + Add New Link
                        </button>
                    </div>

                    <div className="bg-[#0B0618] border border-violet-500/20 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-5">
                            Additional Settings
                        </h2>

                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <p>Project Status</p>
                                <p className="text-sm text-gray-400">
                                    Make this project visible
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={liveStatus}
                                onChange={() => setLiveStatus(prev => !prev)}
                                className="w-5 h-5 accent-violet-600" />
                        </div>

                        <div className="border-t border-violet-500/20 pt-5 flex justify-between items-center">
                            <div>
                                <p>Mark as Favourite</p>
                                <p className="text-sm text-gray-400">
                                    Show in featured section
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={favouriteStatus}
                                onChange={() => setFavouriteStatus(prev => !prev)}
                                className="w-5 h-5 accent-violet-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;