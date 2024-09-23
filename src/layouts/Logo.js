import { Link } from "react-router-dom";
import site_config from "../config/site.config";

const Logo = () => {
  return (
    <Link to="/" className="text-white text-decoration-none h4">
      {site_config.name}
    </Link>
  );
};

export default Logo;
