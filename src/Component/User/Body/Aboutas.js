import React from 'react';
import petImage from '../../../Assets/about.jpg'; // replace with the actual path to your image

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen  px-6 py-12" style={{ backgroundColor: '#2e8bc0' }}>
      {/* Text Content */}
      <div className="md:w-1/2 p-8">
        <h2 className="text-3xl font-bold text-center md:text-left text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold">paw shop</span> — a place where pet lovers, like you,
          can find everything they need to keep their furry, feathered, and scaly friends happy and healthy.
          We believe that pets are family, and our mission is to provide the best quality products, services,
          and guidance to ensure they live their best lives.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Founded in 2024 by a team of passionate pet enthusiasts, [Your Pet Business Name] started with a simple
          goal: to be a trusted resource for pet owners who want to give their pets the care they deserve.
          Since then, we’ve grown into a vibrant community that celebrates the unique bond between people and their pets.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <img
          src={petImage}
          alt="Pets"
          className="w-100px h-100px h-auto rounded-lg  object-cover "
        />
      </div>
    </div>
  );
};

export default AboutUs;
