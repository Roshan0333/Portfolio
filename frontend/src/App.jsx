import { lazy, Suspense } from "react"
import './App.css'
import Navbar from './components/user/navbar'
import { Routes, Route, useLocation } from "react-router-dom";
// import Home from './pages/home';
import Footer from './components/user/footer';
import Profile from "./pages/admin/profile";
import AdminRoute from "./routes/admin";
// import { Education } from './pages/education';
// import { Experience } from './pages/experience';
// import { Project } from './pages/project';
// import { Certficate } from './pages/certificate';
// import { Contact } from './pages/contact';
// import Login from './pages/auth/login';
const Home = lazy(() => import('./pages/user/home'));
const Education  = lazy(() => import('./pages/user/education'));
const Experience = lazy(() => import('./pages/user/experience'));
const Project = lazy(() => import('./pages/user/project'));
const Certficate= lazy(() => import('./pages/user/certificate'));
const Contact= lazy(() => import('./pages/user/contact'));
const Login = lazy(() => import('./pages/admin/login'));

function App() {

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      {/* <AdminNavbar/> */}

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#0B0B15] rounded-xl border border-[#2A2A40]">

            <div className="relative">
              <div className="w-14 h-14 border-4 border-[#8B5CF6]/20 rounded-full"></div>

              <div className="absolute top-0 left-0 w-14 h-14 border-4 border-t-[#8B5CF6] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Loading content...
            </p>

          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path='/project' element={<Project />} />
          <Route path='/certificate' element={<Certficate />} />
          <Route path="contact" element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path="/admin/*" element={<AdminRoute/>} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
