import React from 'react'
import Header from './Header.js'
import Pets from './Pets.js'
import Offer from './Offer.js'
import Testimonial from './Testimonial.js'
import AboutUs from './Aboutas.js'

function Home() {
  return (
    <div>
         <Header/>
         <AboutUs/>
         <Pets/>
         <Offer/>
         <Testimonial/>
    </div>
  )
}

export default Home