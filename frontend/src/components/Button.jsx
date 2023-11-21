import React from "react";
import { Link } from "react-router-dom";

const Button = ({ data, children }) => {
  return (
    <Link
      to={"/post/" + data.id}
      className="btn btn-info mt-auto align-self-start d-flex align-items-center"
    >
      {children}
    </Link>
  );
};

export default Button;
