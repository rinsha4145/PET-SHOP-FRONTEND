import React from 'react'
import Header from '../Header.js'
import Pets from '../Home/Pets.js'
import Offer from './pets/Offer.js'

function Home() {
  return (
    <div>
         <Header/>
         <Pets/>
         <Offer/>
    </div>
  )
}

export default Home