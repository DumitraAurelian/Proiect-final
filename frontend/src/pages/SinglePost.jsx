import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import configData from "../config.json";

export default function SinglePost() {
  const params = useParams();
  const [post, setPost] = useState([{}]);
  useEffect(() => {
    axios
      .get(configData.SERVER_POST_URL + params.id)
      .then(({ data }) => {
        setPost(data["data"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="card mb-4 shadow-lg text-center p-2">
          <img
            className="card-img-top w-50 mx-auto"
            src={`http://localhost:3002/uploads/${post.poza}`}
            alt="..."
          />
          <div className="card-body">
            <div className="d-flex justify-content-around container">
              <div className="small text-muted">
                Categorie: {post.categorie_nume}
              </div>
              <div className="small text-muted">
                Data:{" "}
                {new Date(post.dataadaugare).toLocaleDateString("ro", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
            <h2 className="card-title my-3">{post.titlu}</h2>
            <p
              className="card-text single-post"
              dangerouslySetInnerHTML={{ __html: post.continut }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
