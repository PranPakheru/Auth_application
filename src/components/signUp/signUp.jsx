import React, { useEffect, useState } from "react";
import "./SignUpStyle.css";
import { AxiosService } from "../../source/services/AxiosService";
import { useNavigate, Link } from "react-router-dom";
import * as EmailValidator from "email-validator";

const signUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const axiosService = new AxiosService();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData == null) {
      navigate("/signUp");
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (EmailValidator.validate(signUpData.email)) {
      const regUser = {
        email: signUpData.email,
        password: signUpData.password,
      };

      axiosService
        .registerUser(regUser)
        .then((response) => {
          if (response && response.data) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      });
    } else {
      alert("enter valid email address");
    }
  };

  return (
    <>
      <div className="signUpArea">
        <form onSubmit={handleRegister}>
          <h2>Registration form</h2>
          <hr></hr>

          <div className="fields">
            <td>
              <th>
                <h3>First Name: </h3>
              </th>
              <th>
                <input
                  type="text"
                  placeholder="enter your first name"
                  value={signUpData.firstName}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, firstName: e.target.value })
                  }
                  required
                />
              </th>
            </td>
          </div>

          <div className="fields">
            <td>
              <th>
                <h3>Last Name: </h3>
              </th>
              <th>
                <input
                  type="text"
                  placeholder="enter your last name"
                  value={signUpData.lastName}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, lastName: e.target.value })
                  }
                  required
                />
              </th>
            </td>
          </div>

          <div className="fields">
            <td>
              <th>
                <h3>Email: </h3>
              </th>
              <th>
                <input
                  type="email"
                  placeholder="enter your email address"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                  required
                />
              </th>
            </td>
          </div>

          <div className="fields">
            <td>
              <th>
                <h3>Mobile: </h3>
              </th>
              <th>
                <input
                  type="number"
                  placeholder="enter your mobile number"
                  value={signUpData.mobile}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, mobile: e.target.value })
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
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                  required
                />
              </th>
            </td>
          </div>

          <button type="submit">sign up</button>

          <p className="route">
            Already have an account, <Link to="/"> click here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default signUp;
