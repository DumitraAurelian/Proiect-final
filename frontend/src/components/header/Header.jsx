import "./header.css";
import Picture from "../../assets/Life.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Un blog oarecare</span>
      </div>
      <img
        className="headerImg"
        src={Picture} alt="life"
      />
    </div>
  );
}
