import React, { useState } from "react";
import { sendImage } from "../../../api/Services/CloudServices";

function ImageUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const result = await sendImage(file, "Posts");
        console.log(result.message);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ImageUpload;
