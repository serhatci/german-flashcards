import "./buttons.css";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.targetPage} className="none-decoration">
      <div className="home-buttons" id="home-buttons">
        {props.title}
      </div>
    </Link>
  );
};

export default Button;
