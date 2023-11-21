import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import configData from "../config.json";

const replaceHtmlTagsRecursive = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => replaceHtmlTagsRecursive(item));
  }

  if (typeof data === "object") {
    const newData = {};

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        newData[key] = replaceHtmlTagsRecursive(data[key]);
      }
    }

    return newData;
  }

  if (typeof data === "string") {
    // Replace HTML tags using regex
    return data.replace(/(<([^>]+)>)/gi, "");
  }

  // Return other data types unchanged
  return data;
};
// Function to get the current date and time
export default function Posts() {
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    axios
      .get(configData.SERVER_POST_URL)
      .then(({ data }) => {
        const updatedData = replaceHtmlTagsRecursive(data["data"]);
        setPosts(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section class="bg-white rounded shadow-sm ">
        <div className="container">
          <div className="row">
            <h1 className="text-center my-5 title-heading">Articole</h1>
            {posts.map((data, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-3 col-lg-3  d-flex align-items-stretch"
              >
                <div className="card mb-4">
                  <Link to={"/post/" + data.id}>
                    <img
                      className="card-img-top"
                      src={`http://localhost:3002/uploads/${data.poza}`}
                      alt="..."
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <div className="small text-muted">{data.dataadaugare}</div>
                    <h5 className="card-title">{data.titlu}</h5>
                    <div className="text-truncate-container my-4">
                      <p className="card-text">
                        {data.continut ? data.continut.substr(0, 100) : ""}
                      </p>
                    </div>
                    <Button data={data}>
                      <span className="me-3">Cititi articolul</span>{" "}
                      <BiRightArrowAlt />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
