import Home from "../Pages/Home/Home";
import Tour from "../Pages/Tour/Tour";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Gallery from "../Pages/Gallery/Gallery";
import Sponsor from "../Pages/Sponsor/Sponsor";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "../Auth/Sign In/SignIn";
import SignUp from "../Auth/Sign Up/SignUp";
import { useEffect, useState, useContext } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CreateTour from "../Pages/Tour/CreateTour";
import DetailPage from "../Pages/Tour/Detail";
import Profile from "../User/UserProfile/Profile";
import AdminProfile from "../Admin/AdminProfile/Profile";
import Blog from "../Pages/Blog/Blog";
import CreatePost from "../Pages/Blog/CreatePost";
import NorthTour from "../Pages/Tour/NorthTour";
import MiddleTour from "../Pages/Tour/MiddleTour";
import SouthTour from "../Pages/Tour/SouthTour";
import AsiaTour from "../Pages/Tour/AsiaTour";
import EuropeTour from "../Pages/Tour/EuropeTour";
import AmericaTour from "../Pages/Tour/AmericaTour";
import BlogPostDetail from "../Pages/Blog/BlogPostDetail";
import UpdatePost from "../Pages/Blog/UpdatePost";
import NotFoundPage from "../../view/NotFoundPage";
import CreateTourPackage from "../Pages/Tour/CreateTourPakage";
import UserContext from "../../UserContext";
import UserManagementPage from "../Admin/UserManagement/UserManagement";

function Navigation() {
  const location = useLocation();
  const [showArrow, setShowArrow] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        {user.role == "admin" && (
          <>
            <Route path="/createTour" element={<CreateTour />} />
            <Route path="/createTourPackage" element={<CreateTourPackage />} />
            <Route path="/userManagement" element={<UserManagementPage />} />
          </>
        )}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/admin" element={<AdminProfile />} />
        <Route path="/create/post" element={<CreatePost />} />
        <Route path="/NorthTour" element={<NorthTour />} />
        <Route path="/SouthTour" element={<SouthTour />} />
        <Route path="/MiddleTour" element={<MiddleTour />} />
        <Route path="/AsiaTour" element={<AsiaTour />} />
        <Route path="/AmericaTour" element={<AmericaTour />} />
        <Route path="/EuropeTour" element={<EuropeTour />} />
        <Route path="/detail/:tourId" element={<DetailPage />} />
        <Route path="/post/:postId" element={<BlogPostDetail />} />
        <Route path="/update/post/:postId" element={<UpdatePost />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {showArrow && (
        <button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
            zIndex: "1000",
          }}
        >
          <ArrowCircleUpIcon color="primary" fontSize="large" />
        </button>
      )}
    </>
  );
}

export default Navigation;
