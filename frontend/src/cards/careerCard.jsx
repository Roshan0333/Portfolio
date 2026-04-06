export function CareerCard({ data }) {
    return (
        <div className="w-[98%] md:w-[80%] border-3 border-[#6A3FD1] p-4 bg-[#14072F] rounded-2xl ">
            <div className="max-w-full">
                <div className="max-w-full flex flex-col text-left">
                    <div className="max-w-full flex justify-between">
                        <p className="text-2xl font-bold text-white">{data.companyName}</p>
                        <div className="bg-gradient-to-r from-[#14072F] via-[#3A1C71] to-[#6A3FD1] rounded-2xl px-2 py-1">
                            <p className="text-white">{data.joiningDate} - {data.leavingDate}</p>
                        </div>
                    </div>
                    <p>{data.position}</p>
                </div>

            </div>

            <div className="border-t-2 border-[#414167] my-4"></div>

            <div className="max-w-full text-left">
                <p className="max-w-full text-white">{data.description}</p>
            </div>
            <div className="border-t-2 border-[#414167] my-4"></div>
        </div>
    )
}