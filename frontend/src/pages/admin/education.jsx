import { useState, useEffect } from "react";
import { FaBook, FaSchool, FaTrash, FaPen, FaGraduationCap, FaTimes } from "react-icons/fa";
import { postService } from "../../service/axios.js"

export function Education() {

    const educationData = [
        {
            schoolName: "IGNOU University",
            standed: "Bachelor's Degree",
            grade: "8.2 CGPA",
            start: "Jul 2023",
            end: "Jun 2026",
            subject: "Bachelor of Computer Applications (BCA)",
            description:
                "Focused on full stack development, data structures, and software engineering concepts."
        },
        {
            schoolName: "XYZ Senior Secondary School",
            standed: "12th (Senior Secondary)",
            grade: "85%",
            start: "Apr 2021",
            end: "Mar 2023",
            subject: "Science (PCM)",
            description:
                "Studied Physics, Chemistry, and Mathematics with consistent academic performance."
        },
        {
            schoolName: "ABC Senior Secondary School",
            standed: "10th (Secondary)",
            grade: "88%",
            start: "Apr 2019",
            end: "Mar 2021",
            subject: "Science",
            description:
                "Built strong fundamentals in science and mathematics with excellent results."
        },
        {
            schoolName: "Udemy Online Learning",
            standed: "Certification",
            grade: "Completed",
            start: "Jan 2024",
            end: "Mar 2024",
            subject: "MERN Stack Development",
            description:
                "Completed hands-on training in React, Node.js, Express, MongoDB, and REST APIs."
        }
    ];

    const [formflag, setFormFlag] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);

    const handleFormFlag = (data) => {
        setSelectedEducation(data);
        setFormFlag(prev => !prev)
    }

    return (
        <div className="w-full max-h-screen p-2 bg-[#14072F] mr-2 rounded-2xl overflow-hidden">

            {formflag &&
                <div className="fixed inset-0 z-[10000] flex items-start justify-center backdrop-blur-sm bg-black/30">
                    <EducationForm flag={handleFormFlag} data={selectedEducation} />
                </div>}

            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <p className="text-4xl text-white">Education</p>
                    <p>Add your education background details</p>
                </div>

                <div className="bg-gradient-to-r from-[#4C0FAF] via-[#6A1BDB] to-[#8138e7] rounded-xl">
                    <button className="text-white p-2 " onClick={handleFormFlag}>+ Add Education</button>
                </div>
            </div>

            <div className="border-t-2 border-white mt-2"></div>

            <div className="w-full mt-2">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-3 bg-[#1d0c45] border-[#8138e7] border-2 text-white rounded-full border-2">
                            <FaBook className="text-2xl" />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-xl text-white">My Education</p>
                            <p className="text-[15px]">Manage your education records</p>
                        </div>
                    </div>

                    <div className="p-1 bg-[#1d0c45] border-[#8138e7] border-2 text-white text-[18px] rounded-xl">
                        <p>{educationData.length}</p>
                        <p>Items</p>
                    </div>
                </div>

                <div className="mt-6 h-[75vh] overflow-y-auto space-y-4 pr-2">
                    <div className="grid gap-4 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-2">
                        {educationData.map((item, index) => {
                            return <EducationCard key={index} item={item} flag={handleFormFlag} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}


function EducationCard({ item, flag }) {
    return (
        <div className="flex flex-col gap-3 p-4 bg-[#1d0c45] rounded-xl shadow-md">
            <div className="flex justify-between gap-1">
                <div className="flex gap-2">
                    <div className="w-[80px] h-[80px] p-3 bg-[#14072F] text-white border-2 border-[#8138e7] flex items-center justify-center rounded-full">
                        <FaSchool className="text-3xl" />
                    </div>
                    <div className="flex flex-col justify-center items-start text-left">
                        <p className="text-[20px] text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{item.standed}</p>
                        <p className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{item.schoolName}</p>
                        <p className="bg-amber-500 p-1 px-2 text-[14px] text-white rounded-xl">{`${item.start} - ${item.end}`}</p>
                    </div>
                </div>
                <div className="flex gap-2 h-[35px]">
                    <div className=" p-2 bg-[#14072F] text-white border-2 border-[#8138e7] flex items-center justify-center rounded-[8px]">
                        <FaPen className="text-[15px]" onClick={() => flag(item)} />
                    </div><div className="p-2 bg-red-400 flex items-center justify-center rounded-[8px]">
                        <FaTrash className="text-[15px] text-red-600" />
                    </div>
                </div>
            </div>

            <div className="w-full text-sm text-gray-300 space-y-1 text-left">
                <p><strong className="text-white">Grade:</strong> {item.grade}</p>
                <p><strong className="text-white">Subject:</strong> {item.subject}</p>
                <p><strong className="text-white">Description:</strong> {item.description}</p>
            </div>
        </div>
    )
}

function EducationForm({ flag, data }) {

    const [college, setCollege] = useState(null);
    const [degree, setDegree] = useState(null);
    const [grade, setGrade] = useState(null);
    const [subject, setSubject] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [description, setDescription] = useState(null);

    const addEducation = async () => {
        try {
            const formData = {
                schoolName: college,
                standed: degree,
                grade: grade,
                subject: subject,
                description: description,
                start: start,
                end: end
            }

            const res = await postService(
                "/portfolio/education/add",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.statusCode === 200) {
                alert(res.message);
                setCollege(null);
                setDegree(null);
                setDescription(null);
                setEnd(null);
                setGrade(null);
                setStart(null);
                setSubject(null);
                flag()
                return
            }

            if (res.fetchMessage) {
                alert(res.message)
            }
            else {
                console.log(res.message)
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (data) {
            setCollege(data.schoolName);
            setDegree(data.standed);
            setGrade(data.grade);
            setSubject(data.subject);
            setStart(data.start);
            setEnd(data.end);
            setDescription(data.description);
        }
    }, [data]);

    return (
        <div className="w-full md:w-[90%] h-screen bg-[#14072F] mt-2 flex flex-col items-center p-2 gap-3 rounded-2xl">
            <div className="w-[90%] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-[60px] h-[60px] border-2 border-[#8138e7] bg-[#4818b8] text-white rounded-full flex justify-center items-center">
                        <FaGraduationCap className="text-4xl" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-2xl text-white">Add Education</p>
                        <p>Fill in your education details</p>
                    </div>
                </div>
                <FaTimes className="text-2xl text-white" onClick={flag} />
            </div>

            <div className="w-full py-2 flex flex-col items-center justify-center bg-[#1d0c45] rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-[90%]">
                    <div className="flex flex-col w-full items-start text-white gap-2">
                        <label>School/College Name *</label>
                        <input
                            type="text"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            required
                            placeholder="Enter School/College Name"
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Standed/Degree *</label>
                        <input
                            type="text"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            required
                            placeholder="Enter Standed/Degree"
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Grade *</label>
                        <input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            required
                            placeholder="Enter Grade"
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Subject *</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            placeholder="Enter Subject"
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Start Year *</label>
                        <input
                            type="date"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            required
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>End Year *</label>
                        <input
                            type="date"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            required
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>
                </div>

                <div className="w-[90%] flex flex-col gap-2">
                    <label className="text-left">Description *</label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        className="h-[200px] w-full border-2 border-[#1d0c45] bg-[#14072F] rounded-xl p-2"
                    />
                </div>

                <div className="w-[90%] flex items-center justify-end gap-4 mt-2">
                    <button className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl py-2 px-3 text-white">Cancel</button>
                    <label className="flex items-center gap-2 bg-gradient-to-r from-[#4C0FAF] via-[#8a47e7] to-[#ea61d1] rounded-xl py-2 px-3 text-white"><FaBook /><p>Save Education</p></label>
                </div>
            </div>
        </div>
    )
}