import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  //   const upload = async () => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const res = await axios.post("/upload", formData);
  //       return res.data;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const handleClick = async (e) => {
    e.preventDefault();

    // const imgURL = await upload();

    const newdata = new FormData();
    newdata.append("title", title);
    newdata.append("desc", value);
    newdata.append("cat", cat);
    newdata.append("file", file);
    newdata.append("date", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));

    const editdata = new FormData();
    editdata.append("title", title);
    editdata.append("desc", value);
    editdata.append("cat", cat);
    editdata.append("file", file);

    try {
      state
        ? await axios.put(`/posts/${state.id}`, editdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(`/posts/`, newdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      navigate("/");
    } catch (err) {
      // try {
      //     state
      //       ? await axios.put(`/posts/${state.id}`, {
      //           title,
      //           desc: value,
      //           cat,
      //           img: file ? imgUrl : "",
      //         })
      //       : await axios.post(`/posts/`, {
      //           title,
      //           desc: value,
      //           cat,
      //           img: file ? imgUrl : "",
      //           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      //         });
      //   }
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
