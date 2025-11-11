import React from "react";
import logo2 from "../assets/logo2.png";
import googleImage from "../assets/googleImage.png";
import backIcon from "../assets/left-arrow.png";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup, signOut } from "../firebase";


const SignUpPage = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/btwob"); 
            console.log(result.user);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    return (
        <div className="h-screen flex flex-col md:flex-row bg-white overflow-hidden relative">

            <button
                className="absolute top-4 left-4 md:top-8 md:left-8 text-gray-700 hover:opacity-80 transition"
                aria-label="Go back"
                onClick={handleLogin}
            >
                <img
                    src={backIcon}
                    alt="Back"
                    className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
            </button>

            {/* 🟩 LEFT PANEL */}
            <div className="w-full md:w-1/2 h-64 md:h-full bg-[#34A853] flex flex-col items-center justify-center p-8">
                <img
                    src={logo2}
                    alt="Wellvantage Logo"
                    className="w-40 md:w-[260px] h-auto object-contain"
                />
            </div>

            {/* ⚪ RIGHT PANEL */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 md:p-16">
                <div className="max-w-sm w-full text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
                    <p className="text-sm text-gray-700 mb-8 font-medium">
                        Welcome! Manage, Track and Grow your Gym with Wellvantage.
                    </p>

                    {/* Google Sign-In Button */}
                    <button
                        className="w-full flex items-center justify-center border border-gray-300 rounded-lg shadow-sm px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
                        onClick={handleLogin}
                    >
                        <img
                            src={googleImage}
                            alt="Google"
                            className="h-5 w-5 mr-2 object-contain"
                        />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
