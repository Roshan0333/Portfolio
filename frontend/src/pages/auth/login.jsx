import { useState } from "react";
import { FaEye, FaGithub, FaLinkedin } from "react-icons/fa"

function Login() {

    const [open, setOpen] = useState(false);

    const showPassword = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className="max-w-full h-full flex justify-center items-center mt-4 p-3">
            <div className="p-4 w-full md:w-[60%] flex flex-col justify-center items-center gap-2 border-2 rounded-xl border-[#5f30ce] shadow-[0_0_20px_#b329cb]">
                <h1>Welcome Back!</h1>
                <p>Login to your account</p>

                <div className="p-2 w-full md:w-[80%] flex flex-col justify-center items-center gap-4 mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full bg-[#14072F] p-3 border-2 border-[#5520b7] rounded-xl text-white"
                    />

                    <div className="w-full flex bg-[#14072F] justify-center items-center gap-3 border-2 border-[#5520b7] rounded-xl focus-within:border-white">
                        <input
                            type={open ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="flex-1 p-3 focus:outline-none focus:border-transparent text-white"
                        />

                        <FaEye
                            onClick={showPassword}

                            size={20}
                            className={`${(open) ? "text-white" : "text-blak"} mr-2`}
                        />
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                className="mt-1"
                            />

                            <p>Remember Me</p>
                        </div>

                        <p>Forgot Password?</p>
                    </div>

                    <button className="py-2 px-5 w-full md:w-[30%] border-2 rounded-3xl border-x-4 border-[#b329cb] border-x-[#b329cb] bg-[#14072F] text-white shadow-[0_0_10px_#b329cb]">Log In</button>

                    <div className="flex gap-3">
                        <div className="w-[40px] h-[40px] flex justify-center items-center border-2 border-[#b329cb] rounded-full bg-[#14072F] shadow-[0_0_10px_#b329cb]">
                            <FaGithub
                                className="w-[25px] h-[25px]"
                            />
                        </div>

                        <div className="w-[40px] h-[40px] flex justify-center items-center border-2 border-[#b329cb] rounded-full bg-[#14072F] shadow-[0_0_10px_#b329cb]">
                            <FaLinkedin
                                className="w-[25px] h-[25px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;