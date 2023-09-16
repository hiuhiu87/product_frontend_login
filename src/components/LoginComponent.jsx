import { Fragment, useEffect } from "react";
import "../style/LoginStyle.css";
import Header from "./Header";
import { useState } from "react";
import validator from "validator";
import service from "../service/ProductService";
import { useAuth } from "../authentication/AuthCustome";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageValidate, setMessageValidate] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const dataLocalStorage = JSON.parse(localStorage.getItem("user"));

  const validateField = () => {
    const message = {};
    if (validator.isEmpty(email.trim())) {
      message.email = "Please enter your email";
    }

    if (validator.isEmpty(email.trim())) {
      message.password = "Please enter your password";
    }

    setMessageValidate(message);
    if (Object.keys(message).length > 0) return false;
    return true;
  };

  const showAlert = (title, message, typeAlert) => {
    Swal.fire({
      title: title,
      text: message,
      icon: typeAlert,
      confirmButtonText: "OK",
      timer: 3000,
    });
  };

  const handleSubmit = (e) => {
    const isValid = validateField();
    if (!isValid) return;
    const loginInfor = { email, password };
    service
      .loginRequest(loginInfor)
      .then((response) => {
        console.log(response.data);
        login(response.data);
        showAlert("Thông Báo", "Đăng Nhập Thành Công", "success");
      })
      .catch((error) => {
        console.log(error);
        let errorMessage;
        if (error.response.data.email) {
          errorMessage = error.response.data.email;
        } else {
          errorMessage = error.response.data;
        }
        showAlert("Error", errorMessage, "error");
      });
  };

  const handSubmitFaceBook = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:8081/oauth2/authorization/facebook";
  };

  const checkLogin = () => {
    if (dataLocalStorage !== null && dataLocalStorage !== undefined) {
      const data = {
        email: dataLocalStorage.email,
        accessToken: dataLocalStorage.accessToken,
      };
      login(data);
      navigate("/");
    }
  };

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Header center={"text-center"} title={"Login Page"} />
      <div
        className="container-login"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
        tabIndex={0}
      >
        <br />
        <form className="container-lg">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error-message text-danger fs-6">
              {messageValidate.email}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error-message text-danger fs-6">
              {messageValidate.password}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-success"
          >
            Login
          </button>
          <Link
            to={"/register"}
            className="btn btn-secondary"
            style={{ marginLeft: "5px" }}
          >
            Register
          </Link>
        </form>

        <div className="d-flex d-flex justify-content-center mt-3 pb-3">
          <button
            onClick={(e) => handSubmitFaceBook(e)}
            className="btn btn-primary"
          >
            Login By Facebook
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginComponent;
