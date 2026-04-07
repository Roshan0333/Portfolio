import {FaGithub, FaChrome} from "react-icons/fa"

export function ProjectCard({ data }) {
    return (
        <div className="h-[480px] p-2 flex flex-col border-2 border-[#3A1C71] bg-[#14072F] rounded-2xl text-left gap-2 overflow-hidden text-white">

            <img
                src={data.homeImage}
                className="w-full h-[160px] object-cover rounded-t-2xl"
                alt="Project"
            />

            <p className="text-xl font-bold text-white h-[35px] truncate line-clamp-2">
                {data.projectName}
            </p>

            <div className="h-[2px] bg-[#3A1C71] shadow-[0_0_10px_#6A3FD1]"></div>

            <p className="text-sm truncate ">
                {data.shortBrifing}
            </p>

            <p className="text-sm h-[70px] overflow-hidden line-clamp-3">
                {data.description}
            </p>

            <div className="flex gap-1 flex-wrap h-[40px] overflow-hidden">
                {data.technology.slice(0, 3).map((item, index) => (
                    <p key={index} className="px-2 py-1 bg-green-600 text-xs text-white rounded-lg flex justify-center items-center">
                        {item}
                    </p>
                ))}
            </div>

            <div className="h-[2px] bg-[#3A1C71] shadow-[0_0_10px_#6A3FD1]"></div>

            <div className="text-sm h-[50px] overflow-hidden">
                <div className="flex gap-1">
                    <span className="font-semibold font-bold text-white">Role:</span>
                    <span className="truncate text-white">{data.role}</span>
                </div>

                <div className="flex gap-1">
                    <span className="font-semibold font-bold text-white">Duration:</span>
                    <span className="truncate text-white">{data.durationTime}</span>
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex-1 flex w-[60px] gap-[10px]">
                    {data.socialMedia.map((item, index) => {
                        return (item.name === "github")?
                        <a href={item.link} key={index}><FaGithub size={"25px"} /></a>:<a href={item.link} key={index}><FaChrome size={"25px"}/></a>
                    })}
                </div>

                <button className="flex-1 mt-auto bg-gradient-to-r from-[#441a9a] via-[#3A1C71] to-[#6A3FD1] p-2 rounded-xl text-sm cursor-pointer">
                    View Details &gt;
                </button>
            </div>
        </div>
    )
}