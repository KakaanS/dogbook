import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [CheckedIn, setCheckedIn] = useState(false);
  const [friendNames, setFriendNames] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch(`http://localhost:3002/dogs/${id}`);
      const data = await response.json();
      setDog(data);
      if (data && data.friends) {
        const friendResponse = await fetch(
          `http://localhost:3002/dogs?id=${data.friends.join("&id=")}`
        );
        const friendList = await friendResponse.json();
        const nameList = [];
        if (friendList && friendList.length > 0) {
          friendList.map((friendItem) => {
            nameList.push(friendItem.dogname);
          });
          setFriendNames(nameList);
        }
      }
    };

    fetchDogs();
  }, [id]);

  const handleCheckIn = async (id) => {
    const updatedDog = { ...dog, checkedIn: true };
    await fetch(`http://localhost:3002/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    });
    setDog(updatedDog);
  };

  const handleCheckOut = async (id) => {
    const updatedDog = { ...dog, checkedIn: false };
    await fetch(`http://localhost:3002/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    });
    setDog(updatedDog);
  };

  if (!dog) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Profile of {dog.dogname}</h1>
      <img className="dogImageProfile" src={dog.image} alt={dog.dogname} />
      <Link to="/users">
        <button className="navBtnUsers">Back to users</button>
      </Link>
      <br />
      <ul className="bigList">
        <li>Nickname: {dog.nickname}</li>
        <li>Owner: {dog.owner}</li>
        <li>Age: {dog.age}</li>
        <li>Breed: {dog.breed}</li>
        <li>
          Friends:{" "}
          {friendNames.length > 0
            ? friendNames.map((name) => <span key={name}>{name}, </span>)
            : "No friends yet."}
        </li>
      </ul>
      <br />
      <h3>Bio:</h3> <p>{dog.bio}</p>
      <button
        className="checkBtn"
        onClick={() =>
          dog.checkedIn ? handleCheckOut(dog.id) : handleCheckIn(dog.id)
        }
      >
        {dog.checkedIn ? "Check Out" : "Check In"}
      </button>
      <Link to={`/EditUserProfile/${dog.id}`}>
        <button className="profileBtn">Edit Profile</button>
      </Link>
    </div>
  );
};

export default UserProfile;
