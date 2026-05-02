import { useState, useEffect } from "react";
import { FaBuilding, FaBriefcase, FaTrash, FaPen, FaGraduationCap, FaTimes } from "react-icons/fa";
import { deleteService, postService, putService } from "../../service/axios.js"

export function Experience() {

    const experienceData = [
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
    const [selectedExperience, setSelectedExperience] = useState(null);

    const handleFormFlag = (data = null) => {
        setSelectedExperience(data);
        setFormFlag(prev => !prev)
    }

    return (
        <div className="w-full max-h-screen p-2 bg-[#14072F] mr-2 rounded-2xl overflow-hidden">

            {formflag &&
                <div className="fixed inset-0 z-[10000] flex items-start justify-center backdrop-blur-sm bg-black/30">
                    <ExperienceForm flag={handleFormFlag} data={selectedExperience} />
                </div>}

            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start text-left">
                    <p className="text-4xl text-white">Experience</p>
                    <p>Add your experience background details</p>
                </div>

                <div className="bg-gradient-to-r from-[#4C0FAF] via-[#6A1BDB] to-[#8138e7] rounded-xl hover:scale-105 transition">
                    <button className="text-white p-2 " onClick={() => handleFormFlag()}>+ Add Experience</button>
                </div>
            </div>

            <div className="border-t-2 border-white mt-2"></div>

            <div className="w-full mt-2">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-3 bg-[#1d0c45] border-[#8138e7] border-2 text-white rounded-full border-2">
                            <FaBuilding className="text-2xl" />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-xl text-white">My Experience</p>
                            <p className="text-[15px]">Manage your experience records</p>
                        </div>
                    </div>

                    <div className="p-1 bg-[#1d0c45] border-[#8138e7] border-2 text-white text-[18px] rounded-xl">
                        <p>{experienceData.length}</p>
                        <p>Items</p>
                    </div>
                </div>

                <div className="mt-6 h-[75vh] overflow-y-auto space-y-4 pr-2">
                    <div className="grid gap-4 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-2">
                        {experienceData.map((item, index) => {
                            return <ExperienceCard key={index} item={item} flag={handleFormFlag} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ExperienceCard({ item, flag }) {

    const deleteExperience = async (id) => {
        try {
            const res = await deleteService(
                "/portfolio/experience/delete",
                { experienceId: id },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.statusCode === 200) {
                alert(res.message)
            }

            if (res.fetchMessage) {
                alert(res.message)
            }
            else {
                console.log(res.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="flex flex-col gap-3 p-4 bg-[#1d0c45] rounded-xl shadow-md">
            <div className="flex justify-between gap-1">
                <div className="flex gap-2">
                    <div className="w-[80px] h-[80px] p-3 bg-[#14072F] text-white border-2 border-[#8138e7] flex items-center justify-center rounded-full">
                        <FaBriefcase className="text-3xl" />
                    </div>
                    <div className="flex flex-col justify-center items-start text-left">
                        <p className="text-[20px] text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{item.standed}</p>
                        <p className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{item.schoolName}</p>
                        <p className="bg-amber-500 p-1 px-2 text-[14px] text-white rounded-xl">{`${item.start} - ${item.end}`}</p>
                    </div>
                </div>
                <div className="flex gap-2 h-[35px]">
                    <div
                        className=" p-2 bg-[#14072F] text-white border-2 border-[#8138e7] flex items-center justify-center rounded-[8px]"
                        onClick={() => flag(item)} >
                        <FaPen className="text-[15px]" />
                    </div>
                    <div
                        className="p-2 bg-red-400 flex items-center justify-center rounded-[8px]"
                        onClick={() => deleteExperience(item._id)}>
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

function ExperienceForm({ flag, data }) {

    const [companyName, setCompanyName] = useState(null);
    const [position, setPosition] = useState(null);
    const [joiningDate, setJoiningDate] = useState(null);
    const [leavingDate, setLeavingDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [status, setStatus] = useState(true);

    const [selectApi, setSelectApi] = useState(true)

    const experience = async () => {

        try {

            const startDate = new Date(joiningDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            });

            const endDate = new Date(leavingDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            });

            const formData = {
                companyName: companyName,
                position: position,
                description: description,
                joiningDate: startDate,
                leavingDate: endDate,
                status: status
            }

            let res;

            if (selectApi) {
                res = await postService(
                    "/portfolio/experience/add",
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }
            else {
                res = await putService(
                    "/portfolio/experience/update",
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }



            if (res.statusCode === 200) {
                alert(res.message);
                setCompanyName(null);
                setPosition(null);
                setDescription(null);
                setLeavingDate(null);
                setJoiningDate(null);
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

        if (!data) return

        const convertToInputFormat = (value) => {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            return `${year}-${month}`; // YYYY-MM
        };

        setCompanyName(data.schoolName);
        setPosition(data.standed);
        setJoiningDate(convertToInputFormat(data.start));
        setLeavingDate(convertToInputFormat(data.end));
        setDescription(data.description);

        setSelectApi(false)

    }, [data]);

    return (
        <div className="w-full md:w-[90%] h-screen bg-[#14072F] mt-2 flex flex-col items-center p-2 gap-3 rounded-2xl">
            <div className="w-[90%] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-[60px] h-[60px] border-2 border-[#8138e7] bg-[#4818b8] text-white rounded-full flex justify-center items-center">
                        <FaGraduationCap className="text-4xl" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-2xl text-white">Add Experience</p>
                        <p>Fill in your experience details</p>
                    </div>
                </div>
                <FaTimes className="text-2xl text-white" onClick={flag} />
            </div>

            <div className="w-full py-2 flex flex-col items-center justify-center bg-[#1d0c45] rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-[90%]">
                    <div className="flex flex-col w-full items-start text-white gap-2">
                        <label>Company Name *</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            placeholder="Enter Company Name"
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Position *</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                            placeholder="Enter Position"
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Joininy Date *</label>
                        <input
                            type="date"
                            value={joiningDate || ""}
                            onChange={(e) => setJoiningDate(e.target.value)}
                            required
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl w-[95%] p-2"
                        />
                    </div>

                    <div className="flex flex-col w-full items-start gap-2 text-white">
                        <label>Leaving Date *</label>
                        <input
                            type="date"
                            value={leavingDate || ""}
                            onChange={(e) => setLeavingDate(e.target.value)}
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

                <div className="w-[90%] flex items-center justify-between gap-4 mt-2">

                    <label className="text-white flex gap-2">
                        <p>Live</p>
                        <input
                            type="checkbox"
                            checked={status}
                            onChange={() => setStatus(prev => !prev)}
                        />
                    </label>


                    <div className="flex gap-2">
                        <button
                            className="border-2 border-[#1d0c45] bg-[#14072F] rounded-xl py-2 px-3 text-white">
                            Cancel
                        </button>
                        <label
                            className="flex items-center gap-2 bg-gradient-to-r from-[#4C0FAF] via-[#8a47e7] to-[#ea61d1] rounded-xl py-2 px-3 text-white"
                            onClick={experience}>
                            <FaBriefcase />
                            <p>Save experience</p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}