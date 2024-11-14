import React from 'react';
import petImage from '../../../Assets/about (3).png'; // replace with the actual path to your image

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-blue-800 to-cyan-600">
      {/* Text Content */}
      <div className="md:w-1/2 p-8 text-white">
        <h2 className="text-4xl font-extrabold text-center md:text-left mb-6 animate-fadeIn">
          About Us
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-gray-200 animate-fadeIn delay-150">
          Welcome to <span className="font-semibold">paw shop</span> — a place where pet lovers, like you,
          can find everything they need to keep their furry, feathered, and scaly friends happy and healthy.
          We believe that pets are family, and our mission is to provide the best quality products, services,
          and guidance to ensure they live their best lives.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-gray-200 animate-fadeIn delay-300">
          Founded in 2024 by a team of passionate pet enthusiasts, <span className="font-semibold">Paw Shop</span> started with a simple
          goal: to be a trusted resource for pet owners who want to give their pets the care they deserve.
          Since then, we’ve grown into a vibrant community that celebrates the unique bond between people and their pets.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8 relative">
        <div className="rounded-lg overflow-hidden l transform hover:scale-105 transition-transform duration-500">
          <img
            src={petImage}
            alt="Pets"
            className="w-full h-auto object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
