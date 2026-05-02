import AdminNavbar from "../components/admin/navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/admin/profile";
import Footer from "../components/user/footer";
import { Education } from "../pages/admin/education";
import { Experience } from "../pages/admin/experience";
import { Certificate } from "../pages/admin/certificate";
import {Inquire} from "../pages/admin/inquire";
import { Project } from "../pages/admin/project";

function AdminRoute() {
    return (
        <div className="max-w-full min-h-screen flex flex-col">
            <div className="max-w-full md:h-screen flex flex-col md:flex-row gap-3 mt-3">
                <AdminNavbar className="h-screen min-h-screen"/>

                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="education" element={<Education/>}/>
                    <Route path="experience" element={<Experience/>}/>
                    <Route path="certificate" element={<Certificate/>}/>
                    <Route path="inquire" element={<Inquire/>}/>
                    <Route path="project" element={<Project/>}/>
                </Routes>
            </div>

            <Footer />

        </div>
    )
}

export default AdminRoute;