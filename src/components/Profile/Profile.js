import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useAuth0 } from "@auth0/auth0-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Profile = () => {
  const {   logout } =useAuth0()
    useAuth0();
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    country: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3000/auth/profile/update";
      const response = await axios.post(url, {
        email,
        ...formData,
      });

      if (response.status === 200) {
        localStorage.setItem("firstName",JSON.stringify(formData.firstName))
        toast.success("Profile updated successfully!");
        navigate('/dashboard')
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="profile_wrapper">
      <form className="profile_content" onSubmit={handleSubmit}>
        <div className="heading_close_wrapper">
          <h1 className="main_heading">Basic Personal Information</h1>
          <IoMdCloseCircleOutline size={25} className="close_icon" onClick={()=>logout({
                logoutParams:{returnTo:window.location.origin}
            })}/>
        </div>

        <input
          type="text"
          required
          name="firstName"
          placeholder="First name"
          className="email_input"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          required
          name="lastName"
          placeholder="Last name"
          className="email_input"
          value={formData.lastName}
          onChange={handleInputChange}
        />

        <input
          type="text"
          readOnly
          value={email}
          className="email_input"
          style={{ cursor: "not-allowed" }}
        />
        <input
          type="text"
          name="organization"
          placeholder="Organization"
          className="email_input"
          value={formData.organization}
          onChange={handleInputChange}
          required
        />
        <br />


        <input
          type="text"
          name="city"
          placeholder="City"
          className="email_input"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          className="email_input"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="email_input"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="email_input"
          value={formData.country}
          onChange={handleInputChange}
          required
        />

        <div className="save_btn_wrapper">
          <button type="submit" className="save_btn">
            Save
          </button>
          
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Profile;
