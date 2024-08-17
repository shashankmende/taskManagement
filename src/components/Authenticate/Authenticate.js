import React, { useContext, useEffect, useState } from "react";
import "./Authenticate.css";
import { useAuth0 } from "@auth0/auth0-react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import googleIcon from "../../assets/google.png";
import facebookIcon from "../../assets/facebook.png";
import microsoftIcon from "../../assets/microsoft.png";
import ProjectState from "../../context/projectContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authenticate = () => {
  const { loginWithRedirect, user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [loginDet, setLoginDet] = useState({ logMail: "", logPswd: "" });
  const [registerDet, setRegisterDet] = useState({ regMail: "", regPswd: "" });
  const { user, setUser } = useContext(ProjectState);
  const navigate = useNavigate();


  
  useEffect(() => {
    const socialLoginSignup = async () => {
      if (isAuthenticated) {
        try {
          const { email, given_name: firstName, family_name: lastName, picture } = auth0User;
  
          const payload = {
            email,
            firstName: firstName || "",
            lastName: lastName || "",
            picture,
            authProvider: auth0User.sub.split("|")[0]
          };
  
          const response = await axios.post('http://localhost:3000/auth/social-login-signup', payload);
  
          console.log('Response from backend:', response.data);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error during social login/signup:', error.response?.data || error.message);
        }
      }
    };
  
    socialLoginSignup();
  }, [isAuthenticated, auth0User, setUser]);
  
  useEffect(() => {
    if (user) {
      
      navigate("/profile");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isLoading) return; 

    if (isAuthenticated && user) {
      
      localStorage.setItem('email', JSON.stringify(user.email));
      navigate('/profile');
    } else if (!isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, user, isLoading, navigate]);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = (isLogin) => {
    setIsLoginActive(isLogin);
  };

  const onChangeLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginDet((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterDet((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (provider) => {
    loginWithRedirect({
      connection: provider,
    }).then(response => {
      
      localStorage.setItem('userEmail', JSON.stringify(response.user.email));
      navigate('/profile');
      
    }).catch(error => {
      console.error("Social login error:", error);
      
    });
  };
  
  
  
  const onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
        const requestBody = {
            email: loginDet.logMail,
            password: loginDet.logPswd,
        };
        const url = 'http://localhost:3000/auth/login';

        const loginResponse = await axios.post(url, requestBody);
        console.log("login response", loginResponse);

        if (loginResponse.status === 200) { // Adjusted to 200 OK
            localStorage.setItem("email", JSON.stringify(loginResponse.data.user.email));
            toast.success(loginResponse.data.message, { position: "top-right" });
            navigate('/profile');
        } else {
            toast.error("Login failed. Please check your credentials and try again.", { position: "top-right" });
        }
    } catch (error) {
        console.error("Login error:", error);
        if (error.response && error.response.status === 400) {
            toast.error("Login failed: Invalid email or password.", { position: "top-right" });
        } else if (error.response && error.response.status === 500) {
            toast.error("Server error: Please try again later.", { position: "top-right" });
        } else {
            toast.error("An unexpected error occurred. Please try again.", { position: "top-right" });
        }
    }
};

  
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        email: registerDet.regMail,
        password: registerDet.regPswd,
      };
  
      const url = 'http://localhost:3000/auth/signup';
  
      const registrationResponse = await axios.post(url, requestBody);
      console.log("registration response", registrationResponse);
  

      if (registrationResponse.status === 201) {
        toast.success(registrationResponse.data.message);
        // navigate('/profile');
        setIsLoginActive(true)
    } else {
        toast.warning("Registration failed. Please try again.");
    }

    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.status === 400) {
        toast.warning("Registration failed: Invalid data. Please check your input.", {
          position: "top-right",
          
        });
      } else if (error.response && error.response.status === 409) {
        toast.info("Registration failed: Email already in use. Please use a different email.", {
          position: "top-right",
          
        });
      } else if (error.response && error.response.status === 500) {
        toast.error("Server error: Please try again later.", {
          position: "top-right",
          
        });
      } else {
        toast.error("An unexpected error occurred during registration. Please try again.", {
          position: "top-right",
          
        });
      }
    }
  };
  

  return (
    <div className="background_wrapper">
      <div className="form_box">
        <div className="button_box">
          <button
            type="button"
            className={`toggle_btn ${isLoginActive ? "active" : ""}`}
            onClick={() => toggleForm(true)}
          >
            Log In
          </button>
          <button
            type="button"
            className={`toggle_btn ${!isLoginActive ? "active" : ""}`}
            onClick={() => toggleForm(false)}
          >
            Register
          </button>
        </div>

        <div
          className={`form_content ${isLoginActive ? "login_active" : "register_active"}`}
        >
          {isLoginActive ? (
            <form className="input_group" onSubmit={onSubmitLogin}>
              <input
                type="email"
                className="input_field"
                placeholder="Registered Email"
                required
                name="logMail"
                value={loginDet.logMail}
                onChange={onChangeLoginInput}
              />
              <div className="password_wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  placeholder="Enter password"
                  required
                  name="logPswd"
                  value={loginDet.logPswd}
                  onChange={onChangeLoginInput}
                />
                <button
                  type="button"
                  className="password_toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
              <button type="submit" className="submit_btn">
                Log In
              </button>
              
            </form>
          ) : (
            <form className="input_group" onSubmit={onSubmitRegister}>
              <input
                value={registerDet.regMail}
                type="email"
                className="input_field"
                placeholder="Email"
                required
                onChange={onChangeRegisterInput}
                name="regMail"
              />
              <div className="password_wrapper">
                <input
                  value={registerDet.regPswd}
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  placeholder="Enter password"
                  required
                  name="regPswd"
                  onChange={onChangeRegisterInput}
                />
                <button
                  type="button"
                  className="password_toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
              <button type="submit" className="submit_btn">
                Register
              </button>
              
            </form>
            
          )}
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

        <div className="line_wrapper">
          <hr className="horizontal_line" />
          <span className="line_text">OR</span>
        </div>

        <div className="social_icons">
      <img
        src={googleIcon}
        alt="Google"
        className="social_icon"
        style={{ borderRadius: "50%" }}
        onClick={() => handleLogin("google-oauth2")}
      />
      <img
        src={facebookIcon}
        alt="Facebook"
        style={{ borderRadius: "50%" }}
        className="social_icon"
        onClick={() => handleLogin("facebook")}
      />
      <img
        src={microsoftIcon}
        alt="Microsoft"
        className="social_icon"
        onClick={() => handleLogin("windowslive")}
      />
    </div>
      </div>
    </div>
  );
};

export default Authenticate;
