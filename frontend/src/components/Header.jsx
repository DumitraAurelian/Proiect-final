import React from "react";
import Life from "../assets/Life.jpg";

export default function Header() {
  return (
    // Page header with logo and tagline
    <header className="py-3 bg-light border-bottom">
      <div className="container">
        <div className="my-3 d-flex justify-content-around align-items-center">
          <div>
            <img src={Life} alt="life" />
          </div>
          <div>
            <h1 className="fw-bolder">Un Jurnal Personal!</h1>
            <p className="lead mb-0">
              Un jurnal despre viata si nu numai!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
