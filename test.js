import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; 
const Profile = () => {
  const { user, isAuthenticated,loginWithRedirect, isLoading,logout } = useAuth0();

  const handleLogin = (provider) => {
    loginWithRedirect({
      connection: provider, // Specify the provider connection name
    });
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (

    <>
     <div className="social-login-buttons">
          <button
            className="social-button google-button"
            onClick={() => handleLogin("google-oauth2")}
          >
            <FaGoogle size={24} /> {/* Google Icon */}
          </button>

          <button
            className="social-button facebook-button"
            onClick={() => handleLogin("facebook")}
          >
            <FaFacebook size={24} /> {/* Facebook Icon */}
          </button>
          <button onClick={()=>logout({
            logoutParams:{returnTo:window.location.origin}
          })}>Logout</button>
        </div>
    
    {isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )}
    </>
  );
};

export default Profile;