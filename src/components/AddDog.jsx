import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import uniqid from "uniqid";

const AddDog = () => {
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState(0);
  const [dogBreed, setDogBreed] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [dogNickName, setDogNickName] = useState("");
  const [dogOwner, setDogOwner] = useState("");
  const [dogBio, setDogBio] = useState("");
  const [dogFriends, setDogFriends] = useState([]);
  const [allDogs, setAllDogs] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const navigate = useNavigate();

  // Bilderna (API)
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        setDogImage(data.message);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  // Meny för att välja vänner
  useEffect(() => {
    fetch("http://localhost:3002/dogs")
      .then((response) => response.json())
      .then((data) => {
        setAllDogs(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newDog = {
      id: uniqid(),
      dogname: dogName,
      nickname: dogNickName,
      age: dogAge,
      breed: dogBreed,
      owner: dogOwner,
      bio: dogBio,
      friends: selectedFriends,
      image: dogImage,
    };

    fetch("http://localhost:3002/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
        navigate("/users");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <h1>Add dog</h1>
      <form className="dogForm" onSubmit={handleFormSubmit}>
        <label htmlFor="dogname">Dog name:</label>
        <input
          type="text"
          id="dogname"
          name="dogname"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
        />

        <label htmlFor="dognickname">Dog nickname:</label>
        <input
          type="text"
          id="dognickname"
          name="dognickname"
          value={dogNickName}
          onChange={(e) => setDogNickName(e.target.value)}
        />

        <label htmlFor="dogage">Dog age:</label>
        <input
          type="number"
          id="dogage"
          name="dogage"
          value={dogAge}
          onChange={(e) => setDogAge(e.target.value)}
        />

        <label htmlFor="dogbreed">Dog breed:</label>
        <input
          type="text"
          id="dogbreed"
          name="dogbreed"
          value={dogBreed}
          onChange={(e) => setDogBreed(e.target.value)}
        />

        <label htmlFor="dogowner">Dog owner:</label>
        <input
          type="text"
          id="dogowner"
          name="dogowner"
          value={dogOwner}
          onChange={(e) => setDogOwner(e.target.value)}
        />

        <label htmlFor="dogbio">Dog bio:</label>
        <input
          type="text"
          id="dogbio"
          name="dogbio"
          value={dogBio}
          onChange={(e) => setDogBio(e.target.value)}
        />

        <label htmlFor="dogfriends">Dog friends:</label>
        <select
          id="dogfriends"
          name="dogfriends"
          multiple
          value={selectedFriends}
          onChange={(e) =>
            setSelectedFriends(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {allDogs.map((dog) => (
            <option key={dog.id} value={dog.id}>
              {dog.dogname}
            </option>
          ))}
        </select>
        <label htmlFor="dogimage">Dog image:</label>
        <input
          type="text"
          attribute="locked"
          id="dogimage"
          name="dogimage"
          value="https://dog.ceo/api/breeds/image/random"
          onChange={(e) => setDogImage(e.target.value)}
        />

        <button type="submit">Add dog</button>
      </form>
    </div>
  );
};

export default AddDog;
