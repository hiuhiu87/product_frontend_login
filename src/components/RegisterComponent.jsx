import { Fragment } from "react";
import "../style/LoginStyle.css";
import Header from "./Header";
import { useState } from "react";
import validator from "validator";
import service from "../service/ProductService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageValidate, setMessageValidate] = useState({});
  const navigate = useNavigate();

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
      .registerRequest(loginInfor)
      .then((response) => {
        console.log(response.data);
        showAlert("Thông Báo", response.data, "info");
        navigate("/login");
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

  return (
    <Fragment>
      <Header center={"text-center"} title={"Register Page"} />
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
              autoComplete="off"
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
              autoComplete="off"
            />
            <span className="error-message text-danger fs-6">
              {messageValidate.password}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-primary"
          >
            Register
          </button>
          <Link to={"/login"} className="btn btn-outline-danger" style={{marginLeft: '5px'}}>Back To Login</Link>
        </form>
      </div>
    </Fragment>
  );
};

export default RegisterComponent;
