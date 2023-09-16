import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandlerFunction = () => {
  const { token, error } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const setUserLogin = async () => {
      if (token) {
        const userLoginData = JSON.parse(token);
        const data = {
          email: userLoginData.email,
          accessToken: userLoginData.accessToken,
        };
        console.log(data);
        localStorage.setItem("user", String(JSON.stringify(data)));
        navigate("/login");
      }
    }
    setUserLogin();
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [error]);

  return null;
};

export default OAuth2RedirectHandlerFunction;
