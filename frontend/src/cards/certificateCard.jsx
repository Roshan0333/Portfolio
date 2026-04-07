import demeCertificate from "../assets/joker.jpeg"

export function CertificateCard({ data }) {
    return (
        <div className="h-[380px] p-5 border border-[#3A1C71] bg-[#14072F] rounded-xl overflow-hidden flex flex-col">

            <div className="relative flex flex-col gap-3 h-full">

                <p className="absolute top-[-10px] left-[-10px] text-xs text-white inline-block bg-gradient-to-r from-[#441a9a] via-[#3A1C71] to-[#6A3FD1] px-2 py-1 rounded-lg">
                    {data.date}
                </p>

                <img
                    src={demeCertificate}
                    alt="Certificate"
                    className="w-full h-[140px] object-cover rounded-xl"
                />

                <div className="flex flex-col gap-1 text-left h-[100px] overflow-hidden">
                    <p className="text-lg font-semibold text-white truncate">
                        {data.name}
                    </p>

                    <p className="text-sm text-gray-300 line-clamp-3 overflow-hidden">
                        {data.description}
                    </p>
                </div>

                <button className="mt-auto w-full bg-gradient-to-r from-[#441a9a] via-[#3A1C71] to-[#6A3FD1] p-2 rounded-xl text-sm cursor-pointer">
                    View Details &gt;
                </button>

            </div>
        </div>
    )
}