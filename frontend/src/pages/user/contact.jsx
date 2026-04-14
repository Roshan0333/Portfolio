import {FaGithub, FaLinkedin} from "react-icons/fa"

function Contact() {
    return (
        <div className="max-w-full h-full flex flex-col justify-center items-center gap-4 p-4">
            <div>
                <h1>
                    Contact Me
                </h1>
                <p className="text-xl">Let's Connect</p>
            </div>

            <div className="w-full md:w-[80%] border-2 border-[#5f30ce]  flex flex-col justify-center items-center gap-4 py-5 px-3 rounded-xl">
                <p className="text-xl px-4 text-[#ffffff]">Feel free to reach out to me via form below or directly through my social media channels</p>
                <div className="px-2 w-full flex flex-col md:flex-row justify-around gap-2">
                    <input
                        type="text"
                        required
                        placeholder="Name"
                        className="bg-[#14072F] flex-1 py-2 px-4 border-2 border-[#5520b7] rounded-xl"
                    />

                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="bg-[#14072F] flex-1 py-2 px-4 border-2 border-[#5520b7] rounded-xl"
                    />
                </div>

                <div className="w-full px-2">
                    <input
                        type="number"
                        required
                        placeholder="Phone Number"
                        minLength={10}
                        maxLength={10}
                        className="bg-[#14072F] w-full py-2 px-4 border-2 border-[#5520b7] rounded-xl"
                    />
                </div>

                <div className="w-full px-2">
                    <textarea
                        type="text"
                        placeholder="Your message"
                        className="h-50 w-full bg-[#14072F] py-2 px-4 border-2 border-[#5520b7] rounded-xl"
                    />
                </div>

                <button className="py-2 px-5 border-2 rounded-3xl border-x-4 border-[#b329cb] border-x-[#b329cb] bg-[#14072F] text-white shadow-[0_0_10px_#b329cb]">Send Message</button>

                <p className="text-xl text-white">You can also find me on:</p>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#4C1D95] rounded-full border-1 border-b-#6D28D9 border-#8B5CF6">
                        <FaGithub className="w-8 h-8" color="#D4D4D4"/>
                    </div>
                   <div className="w-10 h-10 flex items-center justify-center bg-[#4C1D95] rounded-full border-1 border-b-#6D28D9 border-#8B5CF6">
                    <FaLinkedin className="w-8 h-8 rounded-full" color="#D4D4D4"/>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;