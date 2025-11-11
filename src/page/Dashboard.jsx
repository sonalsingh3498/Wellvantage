import React, { useState, useEffect } from 'react';
// Ensure these paths correctly point to your assets
import dasboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';
import logo1 from '../assets/logo1.png';
import { Link } from "react-router-dom";

// Image path assignments (corrected syntax)
const IMAGE_CAROUSEL_1 = dasboard1;
const IMAGE_CAROUSEL_2 = dashboard2;
const IMAGE_CAROUSEL_3 = dashboard3;
const CARD_IMAGE_1 = 'https://via.placeholder.com/300x200?text=Management+Image';
const CARD_IMAGE_2 = 'https://via.placeholder.com/300x200?text=Streamlined+Image';
const LOGO_IMAGE = logo1;




const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const carouselImages = [
        IMAGE_CAROUSEL_1,
        IMAGE_CAROUSEL_2,
        IMAGE_CAROUSEL_3,
    ];

    // Auto-play Carousel Logic
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % carouselImages.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(intervalId);
    }, [carouselImages.length]);

    return (
        // Outer container: Full viewport height and hidden overflow for no scrolling.
        <div className="h-screen flex flex-col md:flex-row bg-white ">

            {/* 1. Left Part: Image Carousel */}
            {/* Takes 50% width on medium screens and up, full height, hidden on mobile */}
            <div
                className="relative w-full md:w-1/2 min-h-[400px] md:h-full bg-cover bg-center hidden md:block transition-all duration-500 ease-in-out"
                style={{
                    backgroundImage: `url(${carouselImages[currentImageIndex]})`,
                }}
            >
                <div className="absolute inset-0 flex flex-col justify-start p-8 w-full h-full">
                    {/* Text on top */}
                    <div className="text-white mt-2">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6">
                            Automate Payments, Retain Members Effortlessly
                        </h1>
                    </div>
                    {/* Dots at bottom */}
                    <div className="absolute bottom-6 left-0 w-full flex justify-center">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`w-3 h-3 rounded-full mx-1 transition-colors ${index === currentImageIndex ? 'bg-green-600' : 'bg-gray-400 hover:bg-white/70'
                                    } cursor-pointer`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* 2. Right Part: Login/Sign Up Content */}
            {/* Takes 50% width on medium screens and up, full width on mobile */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-12 md:h-full">

                {/* Top Content (Welcome, Logo, Button) */}
                <div className="flex flex-col items-center grow justify-center">
                    <div className="max-w-md w-full text-center">

                        {/* Welcome Text */}
                        <h2
                            className="font-[Poppins] font-bold text-[40px] leading-[35px] tracking-normal text-center text-green-700 mb-3"
                            style={{ fontWeight: 700 }} // extra insurance, but 'font-bold' is usually enough
                        >
                            Welcome to
                        </h2>
                        {/* Wellvantage Logo */}
                        <div className="flex items-center justify-center mb-10">
                            <span className="flex items-center">
                                <img src={LOGO_IMAGE} alt="Wellvantage Logo" className="h-15 w-50 inline-block" />
                            </span>
                        </div>

                        {/* Sign Up Button (Login Part) */}
                        <Link to="/signup">

                        <button className="w-full bg-[#34A853] hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-colors mb-12">
                            Gym Owner - Sign Up
                        </button>
                        </Link>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default LandingPage;