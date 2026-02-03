import About from "../components/About"
import Facility from "../components/Faciliity"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Room from "../components/Room"
import Services from "../components/Services"
import Theme from "../components/Theme"


function HomePage(){

            

    return(
        <div>
           <Hero />

           <Facility />

           <About />

           <Room />

           <Services />

           <Theme />

           <Footer />
        </div>
    )
}

export default HomePage