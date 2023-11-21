import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import axios from "axios";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import configData from "../../config.json";
import "./home.css"

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

export default function Home() {
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    axios
      .get(configData.SERVER_POST_URL + "last3")
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
      <Header />
      <section class="bg-light py-3 shadow-sm post">
        <div className="container">
          <div className="row">
            <h1 className="text-center my-5 title-heading">
              Ultimele articole
            </h1>
            {posts.map((data, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 col-lg-4  d-flex align-items-stretch"
              >
                <div className="card mb-4">
                <Link to={"/post/" + data.id} className="link">
                    <img
                      className="card-img-top"
                      src={`http://localhost:3002/uploads/${data.poza}`}
                      alt="..."
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <div className="small text-muted">
                      Categorie: {data.categorie_nume}
                    </div>
                    <h2 className="card-title h4">{data.titlu} </h2>
                    <p className="card-text postDesc">
                      {data.continut ? data.continut.substring(0, 100) : ""}
                    </p>
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
