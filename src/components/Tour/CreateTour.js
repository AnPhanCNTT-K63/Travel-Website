import { Container } from "@mui/material";
import styles from "../../styles/HomePage.module.css";
import React, { useState } from "react";
import { addTour } from "../../api/services";

const CreateTour = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addTour(formData);
      console.log(res);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create Tour</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price ($):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>
        <input type="submit" value="Submit" onSubmit={handleSubmit} />
      </form>
    </div>
  );
};

export default CreateTour;
