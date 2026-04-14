import AdminNavbar from "../components/admin/navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/admin/profile";
import Footer from "../components/user/footer";

function AdminRoute() {
    return (
        <div className="max-w-full min-h-screen flex flex-col">
            <div className="max-w-full md:h-screen flex flex-col md:flex-row gap-3 mt-3">
                <AdminNavbar className="h-screen min-h-screen"/>

                <Routes>
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div>

            <Footer />

        </div>
    )
}

export default AdminRoute;