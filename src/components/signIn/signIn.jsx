import React, { useContext, useEffect, useState } from "react";
import "./SignInStyle.css";
import { useNavigate, Link } from "react-router-dom";
import { AxiosService } from "../../source/services/AxiosService";
import MyContext from "../../context/MyContext";
import * as EmailValidator from "email-validator";

const signIn = () => {
  const { user, setUser } = useContext(MyContext);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const axiosService = new AxiosService();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData == null) {
      navigate("/");
    }
  }, []);

  const handleLogIn = (e) => {
    e.preventDefault();
    if (EmailValidator.validate(signInData.email)) {
      axiosService
        .authenticateUser({
          email: signInData.email,
          password: signInData.password,
        })
        .then((response) => {
          if (response && response.data) {
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setSignInData({
        email: "",
        password: "",
      });
    } else {
      alert("enter valid email address.");
    }
  };

  return (
    <>
      <div className="signInArea">
        <form onSubmit={handleLogIn}>
          <h2>Login here...</h2>
          <hr></hr>

          <div className="fields">
            <td>
              <th>
                <h3>Email: </h3>
              </th>
              <th>
                <input
                  type="email"
                  placeholder="enter your email"
                  value={signInData.email}
                  onChange={(e) =>
                    setSignInData({ ...signInData, email: e.target.value })
                  }
                  required
                />
              </th>
            </td>
          </div>

          <div className="fields">
            <td>
              <th>
                <h3>Password: </h3>
              </th>
              <th>
                <input
                  type="password"
                  placeholder="enter your password"
                  value={signInData.password}
                  onChange={(e) =>
                    setSignInData({ ...signInData, password: e.target.value })
                  }
                  required
                />
              </th>
            </td>
          </div>

          <button type="submit">log in</button>

          <p className="route">
            Don't have an account,<Link to="/signUp"> click here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default signIn;
