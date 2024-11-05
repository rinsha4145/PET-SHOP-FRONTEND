import React from 'react'
import Header from './Header.js'
import Pets from './Pets.js'
import Offer from './Offer.js'
import Testimonial from './Testimonial.js'

function Home() {
  return (
    <div>
         <Header/>
         <Pets/>
         <Offer/>
         <Testimonial/>
    </div>
  )
}

export default Home