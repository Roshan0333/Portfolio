import { ProjectCard } from "../../cards/projectCard";
import { motion } from "framer-motion"

function Project() {

    const projectList = [
        {
            "projectName": "Smart Traffic Management System",
            "homeImage": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a",
            "technology": ["React", "Node.js", "MongoDB"],
            "durationTime": "6 months",
            "role": "Full Stack Developer",
            "shortBrifing": "AI-powered system to manage and optimize traffic flow.",
            "description": "This project analyzes real-time traffic data using AI models and dynamically adjusts signals to reduce congestion and improve road efficiency.",
            "section": [
                {
                    "image": "https://images.unsplash.com/photo-1494526585095-c41746248156",
                    "description": "Dashboard showing live traffic density and congestion levels."
                },
                {
                    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
                    "description": "AI model prediction results for traffic optimization."
                }
            ],
            "socialMedia": [
                { "name": "Github", "link": "https://github.com/example/traffic-system" },
                { "name": "Chrome", "link": "https://traffic-demo.com" }
            ],
            "status": true,
            "faviourate": true
        },
        {
            "projectName": "Movie Recommender System",
            "homeImage": "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
            "technology": ["React", "Node.js", "MongoDB"],
            "durationTime": "6 months",
            "role": "ML Developer",
            "shortBrifing": "Recommends movies based on user preferences.",
            "description": "A machine learning-based system that suggests movies using collaborative and content-based filtering techniques.",
            "section": [
                {
                    "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
                    "description": "User interface for searching and recommending movies."
                }
            ],
            "socialMedia": [
                { "name": "Github", "link": "https://github.com/example/movie-recommender" }
            ],
            "status": true,
            "faviourate": false
        },
        {
            "projectName": "Portfolio Website",
            "homeImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            "technology": ["React", "Node.js", "MongoDB"],
            "durationTime": "6 months",
            "role": "Frontend Developer",
            "shortBrifing": "Personal portfolio to showcase projects.",
            "description": "A responsive and modern portfolio website to display projects, skills, and experience with smooth animations.",
            "section": [
                {
                    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
                    "description": "Project showcase section with interactive UI."
                }
            ],
            "socialMedia": [
                { "name": "Chrome", "link": "https://portfolio-demo.com" }
            ],
            "status": true,
            "faviourate": false
        },
        {
            "projectName": "Chat Application",
            "homeImage": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
            "technology": ["React", "Socket.io", "Node.js"],
            "durationTime": "6 months",
            "role": "Backend Developer",
            "shortBrifing": "Real-time chat application.",
            "description": "A real-time messaging app supporting multiple users, private chats, and live notifications using WebSockets.",
            "section": [
                {
                    "image": "https://images.unsplash.com/photo-1551281044-8d8f5f4b9c23",
                    "description": "Live chat interface with message updates."
                }
            ],
            "socialMedia": [
                { "name": "Github", "link": "https://github.com/example/chat-app" }
            ],
            "status": true,
            "faviourate": false
        }
    ]


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
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
            {projectList.map((item, index) => {
                return <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px"}}
                    variants={cardVariants}
                    className="h-full"
                >
                    <ProjectCard data={item} />
                </motion.div>
            })}
        </motion.div>
    )
}

export default Project;