import { FaQuestion } from "react-icons/fa";
import About from "../pages/About";
import { Link } from "react-router-dom";
import { SlQuestion } from "react-icons/sl";

function AboutIconLink() {
  return (
    <div className="about-link">
      <Link to="/about">
        <SlQuestion size={50} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
