import React from "react";
import SocialFollow from "./SocialFollow";

export default function Footer() {
  return (
    <footer className="py-3 bg-footer">
      <div className="container">
        <SocialFollow />
        <p className="m-0 text-center text-white">
          Copyright &copy;2023 Jurnal Personal
        </p>
      </div>
    </footer>
  );
}
