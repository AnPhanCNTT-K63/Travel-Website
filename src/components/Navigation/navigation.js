import Home from "../Home/Home";
import Tour from "../Tour/Tour";
import AboutUs from "../AboutUs/AboutUs";
import Blog from "../Blog/Blog";
import Gallery from "../Gallery/Gallery";
import Sponsor from "../Sponsor/Sponsor";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import SignInSide from "../Sign in/SignInSide";
import SignUp from "../Sign up/SignUp";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function Navigation() {
  const location = useLocation();
  const [showArrow, setShowArrow] = useState(false);

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
        <Route path="/login" element={<SignInSide />} />
        <Route path="/register" element={<SignUp />} />
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

      {location.pathname !== "/gallery" && <Footer />}
    </>
  );
}

export default Navigation;
