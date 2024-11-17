import React from 'react';
import petImage from '../../../Assets/about.jpg'

const AboutUs = () => {
  return (
    <section className="py-5 relative xl:mr-0 lg:mr-5 mr-0">
    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-2 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-0 flex">
                    <div className="flex-col justify-start lg:items-start items-center flex">
                        
                        <div className="w-full flex-col justify-start lg:items-start items-center mt-[-60px] gap-2 flex">
                            <h2
                                className="text-orange text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                About Us</h2>
                            <p
                                className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                &nbsp;&nbsp;Welcome to <span className="font-semibold">Paw shop</span> — a place where pet lovers, like you,
      can find everything they need to keep their furry, feathered, and scaly friends happy and healthy.
      We believe that pets are family, and our mission is to provide the best quality products, services,
      and guidance to ensure they live their best lives.<br/>
    
          &nbsp;&nbsp;Founded in 2024 by a team of passionate pet enthusiasts, <span className="font-semibold">Paw Shop</span> started with a simple
          goal: to be a trusted resource for pet owners who want to give their pets the care they deserve.
          Since then, we’ve grown into a vibrant community that celebrates the unique bond between people and their pets.
        </p>
                        </div>
                    </div>
                    <div className="w-full flex-col justify-center items-start gap-6 flex"><br/>
                        <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                            <div
                                className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">500+ Happy Pet Parents </h4>
                                <p className="text-gray-500 text-base font-normal leading-relaxed">Bringing Joy to Your Furry Friends, One Product at a Time</p>
                            </div>
                            <div
                                className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">200+ Products
                                </h4>
                                <p className="text-gray-500 text-base font-normal leading-relaxed">Curated Selection to Keep Your Pets Happy and Healthy</p>
                            </div>
                        </div>
                        <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                            <div
                                className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">98% Happy Customers</h4>
                                <p className="text-gray-500 text-base font-normal leading-relaxed">Driven by Passion for Pets and Unmatched Customer Satisfaction

</p>
                            </div>
                            <div
                                className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">98% Positive Feedback
                                    Clients</h4>
                                <p className="text-gray-500 text-base font-normal leading-relaxed">Dedicated to Excellence in Every Pet’s Journey with Us</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
                <div
                    className="sm:w-[564px] w-full sm:h-[646px] h-[30px] sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                    <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover" src={petImage} alt="about Us image" />
                </div>
            </div>
        </div>
    </div>
</section>
                                        
  );
};

export default AboutUs;
