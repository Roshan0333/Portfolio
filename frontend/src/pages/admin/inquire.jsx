import { FaEnvelope } from "react-icons/fa"

export function Inquire() {

    const inquiryData = [
        {
            name: "John Doe",
            email: "john.doe@gmail.com",
            contact: "+91 9876543210",
            message: "I would like to know more about your web development services.",
            status: "Applied"
        },
        {
            name: "Sarah Johnson",
            email: "sarah.johnson@gmail.com",
            contact: "+91 9123456780",
            message: "Can you help me build a MERN stack portfolio website?",
            status: "UnApplied"
        },
        {
            name: "Michael Brown",
            email: "michael.brown@gmail.com",
            contact: "+91 9988776655",
            message: "Interested in collaborating on a full-stack project.",
            status: "Applied"
        },
        {
            name: "Emily Davis",
            email: "emily.davis@gmail.com",
            contact: "+91 8877665544",
            message: "Need a responsive frontend design for my startup website.",
            status: "UnApplied"
        },
        {
            name: "David Wilson",
            email: "david.wilson@gmail.com",
            contact: "+91 7766554433",
            message: "Looking for backend API development support.",
            status: "Applied"
        },
        {
            name: "Sophia Miller",
            email: "sophia.miller@gmail.com",
            contact: "+91 6655443322",
            message: "Can you share pricing details for portfolio development?",
            status: "UnApplied"
        },
        {
            name: "James Anderson",
            email: "james.anderson@gmail.com",
            contact: "+91 9543216780",
            message: "I want to redesign my existing website.",
            status: "Applied"
        },
        {
            name: "Olivia Thomas",
            email: "olivia.thomas@gmail.com",
            contact: "+91 8899001122",
            message: "Need help integrating payment gateway in Flutter app.",
            status: "UnApplied"
        }
    ];

    return (
        <div className="w-full h-screen px-2 py-3 md:px-4 bg-[#14072F] rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-start text-left gap-3 bg-[#4C0FAF] px-2 py-3 rounded-2xl">
                <FaEnvelope className="text-3xl text-[#14072F]" />
                <div>
                    <p className="text-2xl text-white">Inquiries</p>
                    <p>Manage all inquiries and application messages</p>
                </div>
            </div>

            <div className="w-full h-screen rounded-2xl bg-[#1e0e3e] overflow-y-scroll hide-scrollbar">

                <table className="w-full text-white border-collapse">

                    <thead className="bg-[#311361] text-left sticky top-0">
                        <tr>
                            <th className="rounded-tl-xl px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Message</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="rounded-tr-xl px-4 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-[15px] text-left">
                        {inquiryData.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-white/10 hover:bg-[#2a1452] transition"
                            >
                                <td className="px-4 py-4">{index + 1}</td>
                                <td className="px-4 py-4">{item.name}</td>
                                <td className="px-4 py-4">{item.email}</td>
                                <td className="px-4 py-4">{item.contact}</td>

                                <td className="px-4 py-4 max-w-[250px] truncate">
                                    {item.message}
                                </td>

                                <td className="px-4 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${item.status === "Applied"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex gap-2">
                                        {(item.status === "UnApplied") && <button className="px-3 py-1 bg-blue-500 rounded-lg">
                                            Update
                                        </button>}
                                        <button className="px-3 py-1 bg-red-500 rounded-lg">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}