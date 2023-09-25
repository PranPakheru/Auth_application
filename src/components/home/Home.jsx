import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosService } from "../../source/services/AxiosService";
import "./home.css";
import MyContext from "../../context/MyContext";

const Home = () => {
  const { user, setUser } = useContext(MyContext);
  console.log(user, "from context api");
  const navigate = useNavigate();

  const axiosService = new AxiosService();

  const [userData, setUserData] = useState([]);

  const handleLogOut = () => {
    axiosService.logOutUser();
    setUser({});
    localStorage.setItem("user", JSON.stringify(null));
    navigate("/");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData == null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axiosService
      .fetchUserList()
      .then((response) => {
        if (response && response.data) {
          setUserData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>

      <div className="homeContainer">
        {userData.map((user) => (
          <div className="homeCard" key={user.id}>
            <img className="cardImg" src={user.avatar} alt="image" />
            <div className="cardDetails">
              <h2>
                {user.first_name} {user.last_name}
              </h2>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default Home;
