import Apropos from "./Apropos"
import Contact from "./Contact"

import Footer from "./Footer"
import Hero from "./Hero"
import Navbar from "./Navbar"
import ServiceSection from "./ServiceSection"
import SignupSection from "./SignupSection"


const LandingPage = () => {
  return (
    <div className="bg-blue-50 overflow-x-hidden">
      <Navbar/>
      <Hero/>
      <ServiceSection/>
      <Apropos id="apropos"  />
     
      <Contact id="contact" />
      <SignupSection id="signupsection" />
      <Footer/>
    </div>
  )
}

export default LandingPage
