import React from "react";
import Slide4 from "../Slideshow/Slide4";
import BlobSection from "./BlogSection";
import Footer from "../Footer/Footer";
import "../../styles/bLog.css";

const Blog = () => {
  return (
    <div className="blog-container">
      <Slide4 />
      <BlobSection />
    </div>
  );
};

export default Blog;
