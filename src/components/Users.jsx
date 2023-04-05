import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch("http://localhost:3002/dogs");
      const data = await response.json();
      setDogs(data);
    };

    fetchDogs();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3002/dogs/${id}`, {
      method: "DELETE",
    });
    setDogs(dogs.filter((dog) => dog.id !== id));
  };

  return (
    <div>
      <h1>Users</h1>

      <Link to="/AddDog">
        <button className="addDog">Add dog</button>
      </Link>

      <ul className="bigList">
        {dogs &&
          dogs.map((dog, id) => (
            <li key={id}>
              <div className="dogContainer">
                <div className="delContainer">
                  <Link to={`/UserProfile/${dog.id}`}>
                    <button className="profileBtn">Profile</button>
                  </Link>

                  <button
                    className="delBtn"
                    onClick={() => handleDelete(dog.id)}
                  >
                    DEL
                  </button>
                </div>
                <img className="dogImage" src={dog.image} alt={dog.dogname} />
              </div>
              <div className="infoContainer">
                <br />
                <div
                  className={` ${dog.checkedIn ? "checkedIn" : "checkedOut"}`}
                >
                  Status: {dog.checkedIn ? "Checked in" : "Checked out"}
                </div>
                Name: {dog.dogname}
                <br />
                Owner: {dog.owner}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
