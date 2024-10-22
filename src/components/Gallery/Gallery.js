import React from "react";
import Slide3 from "../Slideshow/Slide3";
import ImageSection from "./ImageSection";
import "../../styles/gallery.css";
import Footer from "../Footer/Footer";

const Gallery = () => {
  return (
    <div className="contain">
      <Slide3 />
      <ImageSection />
      <Footer />
    </div>
  );
};

export default Gallery;
