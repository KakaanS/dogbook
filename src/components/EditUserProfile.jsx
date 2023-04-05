import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [formData, setFormData] = useState({
    dogname: "",
    nickname: "",
    owner: "",
    age: "",
    breed: "",
    bio: "",
    friends: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDog = async () => {
      const response = await fetch(`http://localhost:3002/dogs/${id}`);
      const data = await response.json();
      setDog(data);
      setFormData({
        dogname: data.dogname,
        nickname: data.nickname,
        owner: data.owner,
        age: data.age,
        breed: data.breed,
        bio: data.bio,
        friends: data.friends,
        image: data.image,
      });
    };
    fetchDog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3002/dogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    navigate(`/UserProfile/${id}`);
  };
  if (!dog) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Edit Profile of {dog.dogname}</h1>
      <form className="editForm" onSubmit={handleSubmit}>
        <ul className="bigList">
          <li>
            <label className="editLabel" htmlFor="dogname">
              Dog name:
            </label>
            <input
              className="editInput"
              type="text"
              id="dogname"
              name="dogname"
              value={formData.dogname}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="nickname">
              Nickname:
            </label>
            <input
              className="editInput"
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="owner">
              Owner:
            </label>
            <input
              className="editInput"
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="age">
              Age:
            </label>
            <input
              className="editInput"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="breed">
              Breed:
            </label>
            <input
              className="editInput"
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="bio">
              Bio:
            </label>
            <input
              className="editInput"
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="friends">
              Friends:
            </label>
            <input
              className="editInput"
              type="text"
              id="friends"
              name="friends"
              value={formData.friends}
              onChange={handleChange}
            />
          </li>

          <li>
            <label className="editLabel" htmlFor="image">
              Image:
            </label>
            <input
              className="editInput"
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </li>
        </ul>
        <button className="editDog">Save changes</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
