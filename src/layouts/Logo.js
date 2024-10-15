import { Link } from "react-router-dom";
import site_config from "../config/site.config";
import logo from "../assets/images/logos/Untitled design (11).png"

const Logo = () => {
  return (
    <Link to="/" className="text-white text-decoration-none h4">
      <img src= {logo} alt="" srcset="" />
    </Link>
  );
};

export default Logo;
