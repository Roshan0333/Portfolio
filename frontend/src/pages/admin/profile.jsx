import ProfileImage from "../../assets/Roshan.webp"
import { FaCamera, FaCloudUploadAlt, FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import SkillCard from "../../cards/skillsCard";
import { useState } from "react";
import defaultImage from "../../assets/default.webp";

function Profile() {

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

    const [name, setName] = useState("Roshan Ansari")
    const [email, setEmail] = useState("ra786roshanansari@gmail.com");
    const [phone, setPhone] = useState("8076521230");
    const [profession, setProession] = useState("Mern Stack Developer");
    const [dob, setDob] = useState();
    const [address, setAddress] = useState("Faridabad");
    const [city, setCity] = useState("Faridabad");
    const [country, setCountry] = useState("India");
    const [pinCode, setPinCode] = useState("121003");


    const [editFlag, setEditFlag] = useState(false);

    return (
        <div className="w-full md:min-h-screen  flex flex-col md:flex-row mr-2 hide-scrollbar md:border-2 md:rounded-2xl border-[#4815ad] shadow-[0_0_10px_#5520b7] py-2 px-2 gap-2">
            <div className="flex-1 h-full overflow-y-auto flex flex-col items-center gap-2 border-2 border-[#5520b7] shadow-[0_0_10px_#5520b7] rounded-2xl px-3 py-2 hide-scrollbar">

                <div className="relative">
                    <img src={ProfileImage} alt="Profile Image" className="w-30 h-30 rounded-full" />
                    <FaCamera color="#ffffff"  className="absolute top-25 left-7/9 -translate-x-4/7" />
                </div>


                <div className="flex justify-center items-center gap-2 w-[50%] rounded-2xl bg-gradient-to-r from-[#3f118f] to-[#A78BFA] py-1">
                    <FaCloudUploadAlt color="#ffffff" />
                    <p className="text-white">Upload New Resume</p>
                </div>

                <div className="flex justify-center items-center gap-2 w-[50%] rounded-2xl bg-gradient-to-r from-[#3f118f] to-[#A78BFA] py-1">
                    <FaFileAlt color="#ffffff"/>
                    <p className="text-white">Resume.pdf</p>
                </div>

                <div className="w-full bg-[#14072F] px-3 py-4 rounded-2xl">
                    <div className="w-full flex justify-between items-center">
                        <p className="px-3 py-2 text-center text-xl text-white">Skill</p>
                        <p className="px-3 py-2 text-center text-white bg-gradient-to-r from-[#3f118f] to-[#A78BFA] rounded-2xl">+ Add Skill</p>
                    </div>

                    {/* {skillsCardList.map((item, index) => {
                        return <SkillCard skills={item} key={index}/>
                    })} */}

                    <div className="flex flex-col justify-between items-center gap-2 mt-2">
                        {skillsCardList.map((skillArray, index) => {
                            return <div className="flex flex-col gap-1 w-[90%] justify-center items-center bg-[#5520b7] py-3 px-2 rounded-2xl">
                                <p className="text-[20px] text-white">{skillArray.category}</p>
                                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {skillArray.items.map((skill, index) => {
                                        return <div className="flex justify-center items-center p-2 bg-[#14072F] rounded-xl">
                                            <img src={defaultImage} alt="icon" className="h-5 w-5 md:h-7 md:w-7  object-contain" />
                                            <p className="text-white text-[15px]">{skill.name}</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className="w-full bg-[#14072F] px-3 py-4 rounded-2xl flex flex-col justify-center items-center gap-2">
                    <div className="w-full flex justify-between items-center">
                        <p className="px-3 py-2 text-center text-xl text-white">Social Media Links</p>
                        <p className="px-3 py-2 text-center text-white bg-gradient-to-r from-[#3f118f] to-[#A78BFA] rounded-2xl">+ Add Link</p>
                    </div>

                    {/*Social Media Link Add Map after api intergation*/}

                    <div className="flex flex-col gap-1 w-[90%] justify-center items-center bg-[#5520b7] py-3 px-2 rounded-2xl">
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <div className="flex justify-center items-center gap-1 bg-[#14072F] p-2 rounded-xl">
                                <FaGithub color="#ffffff" />
                                <p className="text-white text-[15px]">Github</p>
                            </div>
                            <div className=" flex justify-center items-center gap-1 bg-[#14072F] p-2 rounded-xl">
                                <FaLinkedin color="#0A66C2"/>
                                <p className="text-white text-[15px]">Linkedin</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full px-3 py-2 md:w-[30%] border-2 rounded-3xl border-x-4 border-[#b329cb] border-x-[#b329cb] bg-[#14072F] text-white shadow-[0_0_10px_#b329cb]" onClick={() => setEditFlag(prev => !prev)}>{!editFlag ? "Edit" : "Save Changes"}</button>
            </div>

            <div className={`${(editFlag)?"block":"hidden"} md:block     flex-1 h-full overflow-y-auto flex flex-col items-center gap-2 border-2 border-[#5520b7] shadow-[0_0_10px_#5520b7] rounded-2xl px-3 py-2 hide-scrollbar`}>
                <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                    <p className="w-full text-start text-white">Name</p>
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => {
                            if (editFlag) {
                                setName(e.target.value)
                            }
                        }}

                        className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                    />
                </div>

                <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                    <p className="w-full text-start text-white">Email</p>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => {
                            if (editFlag) {
                                setEmail(e.target.value)
                            }
                        }}
                        className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                    />
                </div>

                <div className="w-full flex gap-1 mt-2">
                    <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                        <p className="w-full text-start text-white">Phone Number</p>
                        <input
                            type="tel"
                            required
                            maxLength={10}
                            min={10}
                            value={phone}
                            onChange={(e) => {
                                if (editFlag) {
                                    setPhone(e.target.value)
                                }
                            }}
                            className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                        <p className="w-full text-start text-white">Profession</p>
                        <input
                            type="text"
                            value={profession}
                            required
                            onChange={(e) => {
                                if (editFlag) {
                                    setProession(e.target.value)
                                }
                            }}
                            className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                    <p className="w-full text-start text-white">Date of Birth</p>
                    <input
                        type="date"
                        value={dob}
                        required
                        onChange={(e) => {
                            if (editFlag) {
                                setDob(e.target.value)
                            }
                        }}
                        className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                    />
                </div>

                <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                    <p className="w-full text-start text-white">Address</p>
                    <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => {
                            if (editFlag) {
                                setAddress(e.target.value);
                            }
                        }}
                        className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                    />
                </div>

                <div className="w-full flex gap-1 mt-2">
                    <div className="flex-1 flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                        <p className="w-full text-start text-white">City</p>
                        <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => {
                                if (editFlag) {
                                    setCity(e.target.value)
                                }
                            }}
                            className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                        <p className="w-full text-start text-white">Country</p>
                        <input
                            type="text"
                            required
                            value={country}
                            onChange={(e) => {
                                if (editFlag) {
                                    setCountry(e.target.value)
                                }
                            }}
                            className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                        <p className="w-full text-start text-white">Pincode</p>
                        <input
                            type="number"
                            required
                            value={pinCode}
                            onChange={(e) => {
                                if (editFlag) {
                                    setPinCode(e.target.value)
                                }
                            }}
                            className="w-full border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;