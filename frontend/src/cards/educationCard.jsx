
import { FaDotCircle, FaStar } from "react-icons/fa"

export function EducationCard({ data }) {
    return (
        <div className="w-[98%] md:w-[80%] flex flex-col gap-3 border-1 border-[#2A2A40] p-5 bg-[#151528] rounded-2xl">
            <div className="flex-1 max-w-full flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-2xl bg-gradient-to-r from-[#14072F] via-[#3A1C71] to-[#6A3FD1] px-5 py-1 text-center">
                    <FaDotCircle color="#8B5CF6" className="mt-0 md:mt-0.5 w-[8px] h-[8px] md:w-[12px] md:h-[12px]"/>
                    <p className="text-[#C4B5FD] text-[10px] md:text-[15px] font-bold">{data.standed}</p>
                </div>

                <div className="text-right rounded-2xl bg-gradient-to-r from-[#14072F] via-[#3A1C71] to-[#6A3FD1]  px-5 py-1">
                    <p className="text-[#C4B5FD] font-bold text-[10px] md:text-[15px]">{data.start} - {data.end}</p>
                </div>
            </div>
            <div className="flex-1 text-left ">
                <p className="text-xl md:text-2xl font-bold text-white">{data.schoolName}</p>
                <p className="text-[#C4B5FD]">{data.degree ? data.degree : data.subject}</p>
            </div>

            <div className="border-t border-[#414167] my-1"></div>

            <div className="flex-1 flex gap-3">
                <div className="flex items-center gap-2">
                    <FaStar color="#8B5CF6" className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]"/>
                     <span className="font-bold text-[13px] md:text-[18px]">Grade:</span><span className="text-[#8B5CF6] text-[13px] md:text-[18px]">{data.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaStar color="#8B5CF6" className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]"/>
                    <span className="font-bold text-[13px] md:text-[18px]">Subject:</span><span className="text-[13px] md:text-[18px]">{data.subject}</span>
                </div>
            </div>

            <div className="flex-1 w-[95%] md:w-[90%] text-left">
                <p>{data.description}</p>
            </div>
        </div>
    )
}

