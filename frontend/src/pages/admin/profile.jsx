import ProfileImage from "../../assets/Roshan.webp"
import { FaCamera, FaCloudUploadAlt, FaFileAlt, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import SkillCard from "../../cards/skillsCard";
import { useState, useRef, useEffect } from "react";
import defaultImage from "../../assets/default.webp";
import { patchService, postService, putService } from "../../service/axios.js"
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/thunk.js";

function Profile() {

    let dispatch = useDispatch();

    const [skillsCardList, setSkillsCardList] = useState([]);
    const [mediaList, setMediaList] = useState([])

    const fileRef = useRef();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profession, setProfession] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [intro, setIntro] = useState("");

    const [selectImage, setSelectImage] = useState(null);
    const [file, setFile] = useState("");

    const [resumeName, setResumeName] = useState("");
    const [oldResume, setOldResume] = useState("")


    const [editFlag, setEditFlag] = useState(false);


    const [skillFlag, setSkillFlag] = useState(false);
    const [mediaFlag, setMediaFlag] = useState(false);

    const changeSkillFlag = () => {
        setSkillFlag(prev => !prev)
    };
    const changeMediaFlag = () => {
        setMediaFlag(prev => !prev)
    }

    const openGallery = () => {
        fileRef.current.click();
    }

    const handleSkillList = (category, file, name) => {
        const index = skillsCardList.findIndex(obj => obj.category === category);
        console.log(index);
        console.log(skillsCardList)

        if (index !== -1) {
            const updatedSkills = [...skillsCardList];

            updatedSkills[index].item.push({ icon: URL.createObjectURL(file), name: name })

            setSkillsCardList(updatedSkills);
        }
        else {
            const newCategory = {
                category: category,
                item: [{ icon: URL.createObjectURL(file), name: name }]
            };
            setSkillsCardList([...skillsCardList, newCategory]);
        }
    }

    const handleMediaList = (file, name, link) => {
        const updatedMedia = [
            ...mediaList,
            {
                icon: URL.createObjectURL(file),
                name: name,
                link: link
            }
        ];

        setMediaList(updatedMedia);
    }

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setSelectImage(imageUrl);
        }
    }

    const uploadResume = async (e) => {
        try {
            const selectedFile = e.target.files[0];

            if (selectedFile) {
                setResumeName(selectedFile.name);

                const formData = new FormData();

                formData.append("Resume", selectedFile);

                const res = await putService(
                    "/portfolio/profile/uploadResume",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                console.log(res);

                if (res.fetchMessage) {
                    alert(res.message)
                }
                else {
                    console.log(res.message)
                }
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const updateProfile = async () => {
        try {

            const formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);
            formData.append("contact", phone);
            formData.append("profession", profession);
            formData.append("introduction", intro);
            formData.append("dob", dob);
            formData.append("ProfileImage", file);
            formData.append("addressObject", JSON.stringify({
                street: address,
                pincode: pinCode,
                city: city,
                country: country
            }));

            const res = await postService(
                "/portfolio/profile/create",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

            if (res.fetchMessage) {
                alert(res.message)
            } else {
                console.log(res.message);
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        ; (
            async () => {
                try {
                    const result = await dispatch(fetchProfile()).unwrap();

                    const profileData = result[0];
                    console.log(profileData)

                    if (profileData) {
                        setName(profileData.name || "");
                        setEmail(profileData.email || "");
                        setPhone(profileData.contact ? String(profileData.contact) : "");
                        setProfession(profileData.profession || "");
                        setDob(
                            profileData.dob && profileData.dob !== "undefined"
                                ? profileData.dob.split("T")[0]
                                : ""
                        );
                        setAddress(profileData.addressObject?.street || "");
                        setCity(profileData.addressObject?.city || "");
                        setCountry(profileData.addressObject?.country || "");
                        setPinCode(profileData.addressObject?.pincode || "");
                        setIntro(profileData.introduction || "");

                        setSelectImage(profileData.profileImage || null);

                        setSkillsCardList(profileData.skill || []);
                        setMediaList(profileData.socialMediaLink || []);
                        setOldResume(profileData.resume || "")
                    }
                }
                catch (err) {
                    console.log(err.message)
                }
            }
        )()
    }, [dispatch])

    return (
        <div className="w-full md:min-h-screen  flex flex-col md:flex-row mr-2 hide-scrollbar md:border-2 md:rounded-2xl border-[#4815ad] shadow-[0_0_10px_#5520b7] py-2 px-2 gap-2">

            {(skillFlag || mediaFlag) && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/30">

                    {skillFlag && <SkillForm flag={changeSkillFlag} list={handleSkillList} />}
                    {mediaFlag && <MediaForm flag={changeMediaFlag} list={handleMediaList} />}

                </div>
            )}

            <div className="flex-1 h-full overflow-y-auto flex flex-col items-center gap-2 border-2 border-[#5520b7] shadow-[0_0_10px_#5520b7] rounded-2xl px-3 py-2 hide-scrollbar">

                <div className="relative">
                    <img src={(selectImage) ? selectImage : ProfileImage} alt="Profile Image" className="w-30 h-30 rounded-full" />
                    <div className="absolute top-25 left-7/9 -translate-x-4/7">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileRef}
                                onChange={(e) => handleChange(e)}
                            />
                            <FaCamera color="#ffffff" />
                        </label>
                    </div>
                </div>


                <div className="flex justify-center items-center gap-2 w-[50%] rounded-2xl bg-gradient-to-r from-[#3f118f] to-[#A78BFA] py-1 px-2 md:px-1">
                    <label className="w-full cursor-pointer flex items-center gap-1 truncate">
                        <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            ref={fileRef}
                            onChange={(e) => uploadResume(e)}
                        />
                        <FaCloudUploadAlt color="#ffffff" />
                        <p className="text-white w-[80%] truncate">{(resumeName === "") ? "Upload New Resume" : resumeName}</p>
                    </label>
                </div>

                {(oldResume !== "") && <div className="flex justify-center items-center gap-2 w-[50%] rounded-2xl bg-gradient-to-r from-[#3f118f] to-[#A78BFA] py-1">
                    <FaFileAlt color="#ffffff" />
                    <p className="text-white">{oldResume ? oldResume.split("/").pop() : "No Resume"}</p>
                </div>}

                <div className="w-full bg-[#14072F] px-3 py-4 rounded-2xl">
                    <div className="w-full flex justify-between items-center">
                        <p className="px-3 py-2 text-center text-xl text-white">Skill</p>
                        <p className="px-3 py-2 text-center text-white bg-gradient-to-r from-[#3f118f] to-[#A78BFA] rounded-2xl hover:cursor-pointer" onClick={changeSkillFlag}>+ Add Skill</p>
                    </div>

                    <div className="flex flex-col justify-between items-center gap-2 mt-2 max-h-50 overflow-auto">
                        {skillsCardList.map((skillArray, index) => {
                            return <div key={index} className="flex flex-col w-full gap-1 justify-center items-center bg-[#5520b7] py-3 px-2 rounded-2xl">
                                <p className="text-[20px] text-white">{skillArray.category}</p>
                                <div className="grid gap-3 w-full justify-center [grid-template-columns:repeat(auto-fit,minmax(100px,max-content))]">
                                    {skillArray.items.map((skill, index) => {
                                        return <div key={index} className="flex justify-center items-center p-2 bg-[#14072F] rounded-xl">
                                            <img src={skill.icon} alt="icon" className="h-5 w-5 md:h-7 md:w-7  object-contain rounded-lg" />
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
                        <p className="px-3 py-2 text-center text-white bg-gradient-to-r from-[#3f118f] to-[#A78BFA] rounded-2xl" onClick={changeMediaFlag}>+ Add Link</p>
                    </div>

                    {/*Social Media Link Add Map after api intergation*/}

                    {(mediaList.length !== 0) && <div className="flex flex-col gap-1 w-[90%] justify-center items-center bg-[#5520b7] py-3 px-2 rounded-2xl">
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {mediaList.map((media, index) => {
                                return <div className="flex justify-center items-center gap-1 bg-[#14072F] p-2 rounded-xl">
                                    <img className="h-5 w-5 md:h-7 md:w-7  object-contain rounded-lg" src={media.icon} color="#ffffff" />
                                    <p className="text-white text-[15px]">{media.name}</p>
                                </div>
                            })}
                        </div>
                    </div>}
                </div>

                <button className="w-full px-3 py-2 md:w-[30%] border-2 rounded-3xl border-x-4 border-[#b329cb] border-x-[#b329cb] bg-[#14072F] text-white shadow-[0_0_10px_#b329cb]"
                    onClick={() => {
                        if (!editFlag) {
                            setEditFlag(prev => !prev)
                        }
                        else {
                            setEditFlag(prev => !prev);
                            updateProfile()
                        }
                    }}>{!editFlag ? "Edit" : "Save Changes"}
                </button>
            </div>

            <div className={`${(editFlag) ? "block" : "hidden"} md:block     flex-1 h-full overflow-y-auto flex flex-col items-center gap-2 border-2 border-[#5520b7] shadow-[0_0_10px_#5520b7] rounded-2xl px-3 py-2 hide-scrollbar`}>
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
                                    setProfession(e.target.value)
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

                <div className="w-full flex flex-col gap-1 mt-2 bg-[#14072F] p-3 rounded-2xl">
                    <p className="w-full text-start text-white">Introduction</p>
                    <textarea
                        type="text"
                        required
                        value={intro}
                        onChange={(e) => {
                            if (editFlag) {
                                setIntro(e.target.value);
                            }
                        }}
                        className="w-full h-[200px] border-2 p-2 rounded-xl bg-[#5520b7] text-white"
                    />
                </div>
            </div>
        </div>
    )
}

function SkillForm({ flag, list }) {

    const fileRef = useRef();

    const [categoryName, setCategory] = useState("");
    const [skillName, setSkillName] = useState("");

    const [file, setFile] = useState("");

    const handleImage = (e) => {
        const iconFile = e.target.files[0];

        if (iconFile) {
            setFile(iconFile);
        }
    }

    const addIcon = async () => {
        try {
            let formData = new FormData();

            formData.append("category", categoryName);
            formData.append("skill", skillName);
            formData.append("Skill", file);

            const res = await patchService(
                "/portfolio/profile/skill",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.statusCode === 200) {
                flag()
                list(categoryName, file, skillName)
                setCategory("");
                setSkillName("");
                setFile("");
                return
            }

            if (res.fetchMessage) {
                alert(res.message);
            }
            else {
                console.log(res.message);
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="h-[60%] max-w-full">
            <div className="bg-[#5520b7] max-w-full text-white p-10  pt-5 border-2 rounded-2xl flex flex-col gap-1 items-center">
                <div className="w-full flex flex-col items-end">
                    <div className="bg-[#14072F] p-1 rounded-full" onClick={flag}>
                        <FaTimes size={20} color="" />
                    </div>
                </div>
                <div className="flex flex-col items-start w-full gap-1">
                    <p>Category</p>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        placeholder="Enter the skill category"
                        className="border-2 w-full p-1 rounded-xl"
                    />
                </div>

                <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col items-start w-full">
                        <p>Skill</p>
                        <input
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            required
                            className="border-2 w-full p-1 rounded-xl"
                            placeholder="Skill Name"
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <p>Icon</p>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileRef}
                            required
                            className="border-2 w-full p-1 rounded-xl"
                            onChange={(e) => handleImage(e)}
                        />
                    </div>
                </div>

                <button
                    className="mt-2 bg-gradient-to-r from-[#14072F] via-[#3A1C71] to-[#6A3FD1] p-2 rounded-2xl w-full md:w-[60%]"
                    onClick={addIcon}>
                    Add Skill
                </button>
            </div>
        </div>
    )
}

function MediaForm({ flag, list }) {

    const fileRef = useRef();

    const [mediaName, setMedia] = useState("");
    const [mediaLink, setMediaLink] = useState("");

    const [file, setFile] = useState("");

    const handleIcon = (e) => {
        const iconFile = e.target.files[0];

        if (iconFile) {
            setFile(iconFile);
        }
    }

    const addMediaLink = async () => {
        try {

            const formData = new FormData();

            formData.append("name", mediaName);
            formData.append("link", mediaLink);
            formData.append("media", file)

            const res = await patchService(
                "/portfolio/profile/media",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.statusCode === 200) {
                flag();
                list(file, mediaName, mediaLink);
                setMedia("");
                setMediaLink("");
                setFile("");
                return
            }

            if (res.fetchMessage) {
                alert(res.message);
            }
            else {
                console.log(res.message);
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="h-[60%] max-w-full">
            <div className="bg-[#5520b7] max-w-full text-white p-10  pt-5 border-2 rounded-2xl flex flex-col gap-1 items-center">
                <div className="w-full flex flex-col items-end">
                    <div className="bg-[#14072F] p-1 rounded-full" onClick={flag}>
                        <FaTimes size={20} color="" />
                    </div>
                </div>

                <div className="w-full flex flex-col items-start gap-1">
                    <p>Media Name</p>
                    <input
                        type="text"
                        value={mediaName}
                        onChange={(e) => setMedia(e.target.value)}
                        required
                        placeholder="Please Enter Media Name"
                        className="border-2 w-full p-1 rounded-xl"
                    />
                </div>

                <div className="w-full flex flex-col items-start gap-1">
                    <p>Media Link</p>
                    <input
                        type="text"
                        value={mediaLink}
                        onChange={(e) => setMediaLink(e.target.value)}
                        required
                        placeholder="Please Enter Media Link"
                        className="border-2 w-full p-1 rounded-xl"
                    />
                </div>

                <div className="w-full flex flex-col items-start gap-1">
                    <p>Icon</p>
                    <input
                        type="file"
                        ref={fileRef}
                        accept="image/*"
                        onChange={(e) => handleIcon(e)}
                        required
                        className="border-2 w-full p-1 rounded-xl"
                    />
                </div>


                <button
                    className="mt-2 bg-gradient-to-r from-[#14072F] via-[#3A1C71] to-[#6A3FD1] p-2 rounded-2xl w-full md:w-[60%]"
                    onClick={addMediaLink}>
                    Add Media
                </button>
            </div>
        </div>
    )
}

export default Profile;