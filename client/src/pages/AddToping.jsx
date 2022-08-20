// dependencies
import React, { useState } from "react";
import { Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// component
import Navbar from "../components/navbar/navbar";

import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
// file
import paperClip from "../assets/paperClip.png";

export default function AddToping() {
  // const [product, setProduct] = useState({});
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  console.log(previewName);
  // const [form,setFrom]


  // Create variabel for store data with useState here ...
  const [topping, setTopping] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store product data


  //handle chahnge data on from

  //handle chahnge data on from
  const handleChange = (e) => {
    setTopping({
      ...topping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    console.log(e.target.files);
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };
  console.log(topping);

  // let navigate = useNavigate();

  const handleSubmit =useMutation(async (e) => {
    try {
      e.prevent.default();

      
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("image", topping.image[0], topping.image[0].name);
      formData.set("title", topping.title);
      formData.set("price", topping.price);


      // Insert category data
      const response = await API.post('/topping', formData, config);
      console.log(response);


      // navigate("/transaction");
    } catch (error) {
    console.log(error)
    }
  });
  return (
    <>
      <Navbar />
      <Container className="addProductContainer">
        <div className="addProductLeft">
          <form onSubmit={(e) =>handleSubmit.mutate (e)}>
            <h1>Toping</h1>
            <input
              type="text"
              placeholder="Name Toping"
              name="title"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleChange}
            />
            <input
              type="file"
              id="addProductImage"
              hidden
              name="image"
              onChange={handleChange}
            />
            <label
              htmlFor="addProductImage"
              className={previewName === "" ? "addProductImage" : "previewName"}
            >
              {previewName === "" ? "Photo Toping" : previewName}
              <img src={paperClip} alt="paperClip" />
            </label>
            <button type="submit">Add Toping</button>
          </form>
        </div>
        {preview && (
          <div className="addProductRight">
            <img src={preview} alt="preview" />
          </div>
        )}
      </Container>
    </>
  );
}
