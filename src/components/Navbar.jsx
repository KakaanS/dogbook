import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navBar">
      <header>
        <h1>DogBook</h1>
        <Link to="/">
          <button className="navBarBtn">Home</button>
        </Link>
        <Link to="/users">
          <button className="navBarBtn">Users</button>
        </Link>
      </header>
    </div>
  );
};

export default Navbar;
