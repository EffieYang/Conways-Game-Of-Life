import { Outlet, Link } from "react-router-dom";
import "../../App.css";

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <h4>Navigation Bar</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/credits">Credits</Link>
          </li>
        </ul>
      </nav>

    <Outlet />
    </>
  )
};

export default Navigation;