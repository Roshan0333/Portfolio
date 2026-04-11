import { lazy, Suspense } from "react"
import './App.css'
import Navbar from './components/navbar'
import { Routes, Route } from "react-router-dom";
// import Home from './pages/home';
import Footer from './components/footer';
// import { Education } from './pages/education';
// import { Experience } from './pages/experience';
// import { Project } from './pages/project';
// import { Certficate } from './pages/certificate';
// import { Contact } from './pages/contact';
// import Login from './pages/auth/login';
const Home = lazy(() => import('./pages/home'));
const Education  = lazy(() => import('./pages/education'));
const Experience = lazy(() => import('./pages/experience'));
const Project = lazy(() => import('./pages/project'));
const Certficate= lazy(() => import('./pages/certificate'));
const Contact= lazy(() => import('./pages/contact'));
const Login = lazy(() => import('./pages/auth/login'));

function App() {

  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#0B0B15] rounded-xl border border-[#2A2A40]">

            <div className="relative">
              <div className="w-14 h-14 border-4 border-[#8B5CF6]/20 rounded-full"></div>

              <div className="absolute top-0 left-0 w-14 h-14 border-4 border-t-[#8B5CF6] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            {/* Text */}
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
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
