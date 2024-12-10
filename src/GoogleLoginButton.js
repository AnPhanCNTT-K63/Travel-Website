import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api/Services/AuthServices";

const clientId =
  "150482798343-gja42u5qbcql346pq8shmn59ctofgvd5.apps.googleusercontent.com";

const LoginByGoogle = () => {
  const handleSuccess = async (credentialResponse) => {
    // console.log("Google Login Success:", credentialResponse);
    // try {
    //   const response = await googleAuth(credentialResponse);
    //   console.log("Backend Response:", response);
    //   if (response.message === "Google login successful") {
    //     // localStorage.setItem("token", response.token); // Assuming the backend returns a token
    //     console.log("JWT saved successfully!");
    //   } else {
    //     console.error("Google Login Backend Error:", response);
    //   }
    // } catch (error) {
    //   console.error("Error communicating with backend:", error);
    // }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default LoginByGoogle;
