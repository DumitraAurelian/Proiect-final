import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const SocialFollow = () => {
  return (
    <div className="text-center my-3">
      <a
        href="https://www.youtube.com"
        className="youtube social"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a
        href="https://www.facebook.com"
        className="facebook social"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a
        href="https://www.twitter.com"
        className="twitter social"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.instagram.com"
        className="instagram social"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
};
export default SocialFollow;
