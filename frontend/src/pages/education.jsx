import { EducationCard } from "../cards/educationCard"
import { FaGraduationCap } from "react-icons/fa"

export function Education() {
    const educationList = [
        {
            "userId": "6610f1c2a1b23c456789abcd",
            "schoolName": "ABC Public School",
            "standed": "10th",
            "grade": "85%",
            "start": "2016",
            "end": "2017",
            "subject": "General",
            "description": "Completed secondary education with distinction.",
            "createdAt": "2024-04-01T10:00:00.000Z",
            "updatedAt": "2024-04-01T10:00:00.000Z"
        },
        {
            "userId": "6610f1c2a1b23c456789abcd",
            "schoolName": "XYZ Senior Secondary School",
            "standed": "12th",
            "grade": "88%",
            "start": "2017",
            "end": "2019",
            "subject": "Science",
            "description": "Focused on Physics, Chemistry, and Mathematics.",
            "createdAt": "2024-04-01T10:05:00.000Z",
            "updatedAt": "2024-04-01T10:05:00.000Z"
        },
        {
            "userId": "6610f1c2a1b23c456789abcd",
            "schoolName": "Delhi University",
            "standed": "Graduation",
            "grade": "7.8 CGPA",
            "degree": "BCA",
            "start": "2019",
            "end": "2022",
            "subject": "Computer Science",
            "description": "Completed BCA with focus on web development and data structures.",
            "createdAt": "2024-04-01T10:10:00.000Z",
            "updatedAt": "2024-04-01T10:10:00.000Z"
        }
    ]


    return (
        <div>
            <div className="relative flex flex-col items-center justify-center gap-4 w-[98%] md:w-[80%] mx-auto p-5">
                <div className="w-full flex items-center gap-1">
                    <div className="border-t-4 w-8 ml-7 border-[#7C3AED] md:w-15 md:ml-10 shadow-[0_0_10px_#8B5CF6]"></div>
                    <div className="text-left mt-4">
                        <p className="text-3xl font-bold text-white">Education</p>
                        <p className="text-[#C4B5FD]">My Education Journey</p>
                    </div>
                </div>
                <div className="absolute top-14 bottom-0 left-[45px] md:left-[60px] lg:left-[65px] w-[4px] 
    bg-gradient-to-b from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] animate-[pulseGlow_5s_infinite]">
                </div>

                <div className="absolute top-14 bottom-0 left-[45px] md:left-[60px] lg:left-[65px] w-[4px] overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-b from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD]"></div> 
                   <div className="absolute w-full h-[50px] top-0 bg-gradient-to-b from-[#E9D5FF] via-[#7C3AED] to-[#4C1D95] animate-[flow_5s_infinite] z-10"></div>
                </div>
                {educationList.map((item, index) => {
                    return <div className="flex items-center justify-center gap-2 md:gap-5 w-full">
                        <div
                            className="z-10 w-15 h-15 md:w-20 md:h-20 flex justify-center items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] p-[2px] shadow-[0_0_10px_#8B5CF6] w-fit">
                            <div
                                className="w-13 h-13 md:w-18 md:h-18 flex justify-center items-center rounded-full bg-[#2A2A40]  shadow-[inset_0_0_10px_#A78BFA,0_0_10px_#8B5CF6]">
                                <FaGraduationCap size={55} className="text-white p-1 rounded-full" />
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <EducationCard data={item} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}