import { useEffect, useState } from "react";
import { FaAward, FaFileAlt, FaCheckCircle, FaEyeSlash, FaCalendar, FaEye, FaTrash } from "react-icons/fa"
import { patchService, postService } from "../../service/axios";

export function Certificate() {

    const certificateSet = [
        {
            "name": "Full Stack Web Development",
            "image": "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            "date": "2024",
            "description": "Completed a comprehensive course covering MERN stack including React, Node.js, Express, and MongoDB. Completed a comprehensive course covering MERN stack including React, Node.js, Express, and MongoDB. Completed a comprehensive course covering MERN stack including React, Node.js, Express, and MongoDB. Completed a comprehensive course covering MERN stack including React, Node.js, Express, and MongoDB.",
            "status": true
        },
        {
            "name": "Data Structures & Algorithms",
            "image": "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            "date": "2023",
            "description": "Mastered core data structures and algorithms with problem-solving practice.",
            "status": true
        },
        {
            "name": "Machine Learning Basics",
            "image": "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            "date": "2024",
            "description": "Learned fundamentals of machine learning including regression, classification, and model evaluation.",
            "status": true
        },
        {
            "name": "Cloud Computing with AWS",
            "image": "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            "date": "2023",
            "description": "Hands-on experience with AWS services like EC2, S3, and Lambda.",
            "status": false
        },
        {
            "name": "Cybersecurity Fundamentals",
            "image": "https://res.cloudinary.com/dnheivzi6/image/upload/v1777144590/Portfolio/qpzvuqzyuk6lnhoaus1o.jpg",
            "date": "2024",
            "description": "Studied security concepts including encryption, threats, and network security.",
            "status": true
        }
    ];

    const [formFlag, setFormFlag] = useState(false)

    const handleFlag = () => {
        setFormFlag(prev => !prev)
    }

    const deleteStatus = async (id) => {
        try {
            const res = await patchService(
                "/portfolio/certficate/delete",
                { certificateId: id },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.statusCode === 200) {
                alert(res.message);
                return true
            }

            if (res.fetchMessage) {
                alert(res.message);
                return false
            }
            else {
                console.log(res.message)
                return false
            }
        }
        catch (err) {
            console.log(err.message);
            return false
        }
    }

    return (
        <div className="w-[98%] ml-[1%] md:w-full md:ml-[0%] h-screen bg-violet-500 p-2 rounded-2xl overflow-y-scroll hide-scrollbar flex flex-col gap-2">

            {formFlag &&
                <div className="h-screen fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
                    <CertificateForm flag={handleFlag} />
                </div>}

            <div className="w-full flex items-center justify-between bg-[#14072F]  p-2 rounded-2xl">
                <div className="flex items-center text-left gap-2">
                    <FaAward className="text-3xl text-violet-500" />
                    <div>
                        <p className="text-3xl text-white">Certificates</p>
                        <p className="">Showcase your achievements and professional certifications</p>
                    </div>
                </div>
                <buttom
                    className="p-2 bg-gradient-to-r from-purple-600 to-violet-500 shadow-md hover:scale-105 transition text-white rounded-xl cursor-pointer"
                    onClick={handleFlag}>
                    + Add Certificate
                </buttom>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-2">
                <div className="p-2 bg-[#14072F] flex items-center gap-2 rounded-xl">
                    <div className="relative w-14 h-14 text-center bg-violet-500 flex items-center justify-center rounded-lg">
                        <FaFileAlt className="absolute text-2xl text-white" />
                        <FaAward className="absolute text-xl text-white top-1/2 left-1/2" />
                    </div>

                    <div className="text-white">
                        <p>Total Certificates</p>
                        <p className="text-2xl">{certificateSet.length}</p>
                    </div>
                </div>

                <div className="p-2 bg-[#14072F] flex items-center gap-2 rounded-xl">
                    <div className="w-14 h-14 text-center bg-[#aafad3] flex items-center justify-center rounded-lg">
                        <FaCheckCircle className="text-green-500 text-2xl" />
                    </div>

                    <div className="text-white">
                        <p>Active</p>
                        <p className="text-2xl">{certificateSet.length}</p>
                    </div>
                </div>

                <div className="p-2 bg-[#14072F] flex items-center gap-2 rounded-xl">
                    <div className="w-14 h-14 text-center bg-[#fcaebf] flex items-center justify-center rounded-lg">
                        <FaEyeSlash className="text-red-500 text-2xl" />
                    </div>

                    <div className="text-white">
                        <p>Hidden</p>
                        <p className="text-2xl">{certificateSet.length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
                {certificateSet.map((item, index) => {
                    return <CertificateCard item={item} deleteFunction={deleteStatus}/>
                })}
            </div>
        </div>
    )
}

function CertificateCard({ item, deleteFunction }) {

    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    const [status, setStatus] = useState(item.status);

    const handleStatus = async () => {
        const res = await updateStatus()
        if (res) {
            setStatus(prev => !prev)
        }

    }

    const data = {
        certificateId: item._id,
        status: !status
    }

    const updateStatus = async () => {
        try {
            const res = await patchService(
                "/portfolio/certficate/update",
                { data },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.statusCode === 200) {
                alert(res.message);
                return true
            }

            if (res.fetchMessage) {
                alert(res.message);
                return false
            }
            else {
                console.log(res.message)
                return false
            }
        }
        catch (err) {
            console.log(err.message);
            return false
        }
    }


    useEffect(() => {

    }, [status])

    return (
        <div className="w-full h-full bg-[#14072F] p-2 rounded-xl relative flex flex-col gap-2">
            <img src={item.image} alt={item.name} className="w-full rounded-lg" />
            <p
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full shadow-md ${item.status
                    ? "bg-green-200 text-green-700 border-2 border-green-700"
                    : "bg-red-200 text-red-600 border-2 "
                    }`}
            >
                {item.status ? "Active" : "Hidden"}
            </p>
            <p className="text-white text-xl">{item.name}</p>
            <div className="flex items-center gap-2">
                <FaCalendar className="text-[15px]" />
                <p className="text-white text-[15px]">{item.date}</p>
            </div>

            <div className="w-full h-[86px]">
                <p className="w-full text-sm text-white/80">{truncateText(item.description, 180)}</p>
            </div>

            <div className="flex gap-2 justify-end mt-3">
                <div className={`${status ? "bg-green-200 border-green-700" : "bg-red-300 border-red-600"} border-2 p-2 rounded-lg hover:scale-105 transition cursor-pointer`} onClick={handleStatus}>
                    {status ? <FaEye className=" text-green-700 " /> : <FaEyeSlash className="text-red-600" />}
                </div>

                <div className="text-red-600 bg-red-300 p-2 rounded-lg hover:scale-105 transition cursor-pointer">
                    <FaTrash onClick={() => deleteFunction(item._id)}/>
                </div>
            </div>
        </div>
    )
}

function CertificateForm({ flag }) {

    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);

    const certificateHandle = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            setFile(selectedImage)
        }
    }

    const addCertificate = async () => {
        try {

            const formatDate = new Date(date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            })

            const formDate = new FormData();

            formDate.append('name', name);
            formDate.append("Certificate", file);
            formDate.append("date", formatDate);
            formDate.append("description", description);

            const res = await postService(
                "/portfolio/certficate/add",
                formDate,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.statusCode === 200) {
                alert(res.message);
                setDate(null);
                setDescription(null);
                setFile(null);
                setName(null);
                flag();
                return
            }

            if (res.fetchMessage) {
                alert(res.message);
                return
            }
            else {
                console.log(res.message)
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="w-[420px] bg-[#14072F] flex flex-col items-center justify-center p-3 rounded-lg text-white shadow-[0_0_30px_#8B5CF6]">
            <div className="w-full flex flex-col items-center text-left gap-2">
                <div className="w-full flex flex-col gap-1">
                    <p>Certificate Name</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-1 text-[15px] font-normal border-2 rounded-lg"
                        placeholder="Enter Certificate Name"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <p>Date</p>
                    <input
                        type="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-1 text-[15px] font-normal border-2 rounded-lg"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <p>Certificate Image</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => certificateHandle(e)}
                        className="w-full p-1 text-[15px] font-normal border-2 rounded-lg"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <p>Certificate Descrition</p>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please enter description"
                        className="w-full h-[150px] text-[15px] font-normal border-2 rounded-lg"
                    />
                </div>
            </div>

            <div className="w-full flex items-center justify-end gap-2 p-3">
                <button className="py-1 px-5 text-[15px] font-normal border-2 rounded-lg" onClick={flag}>Cancel</button>
                <button className="py-1 px-5 text-[15px] font-normal border-2 bg-gradient-to-r from-[#6636c7]  to-[#a419b9] rounded-lg" onClick={addCertificate}>Save</button>
            </div>
        </div>
    )
}