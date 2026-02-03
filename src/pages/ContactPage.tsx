import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

function ContactPage (){

    useGSAP(() => {
        // Only run animation when loading is complete
        const tilteSplit = new SplitText("#contact-title", { type: 'chars, words' })
        const subtitleSplit = new SplitText("#contact-subtitle", { type: 'lines' })
    
        gsap.from(tilteSplit.chars, {
            opacity:0,
            yPercent: 50,
            duration: 1,
            ease: "expo.out",
            stagger: 0.06,
        });
    
        gsap.from(subtitleSplit.lines, {
            opacity:0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.06,
            delay:1.3
        })
    
        gsap.from('#contact', {
            opacity:0,
            duration: 0.5,
            ease: "expo.out",
            delay:1.7
        })
      
    }, [])

    return(
        <section>
            <div className="relative w-full h-[320px] md:h-[350px] lg:h-[400px] overflow-hidden">
                <img 
                    src="/room-details-img.jpg"
                    className="w-full h-full object-cover"
                    alt="Rooms"
                />
                <div className="grid absolute inset-0 items-center justify-center text-center font-serif tracking-wider text-white">
                    <div>
                        <h2 id="contact-title" className="text-[2.2rem] md:text-[3rem]">Get In Touch</h2>
                        <h5 id="contact-subtitle" className="text-[1.2rem] md:text-[1.5rem] mt-3 lg:mt-5">Let Us Help You Plan Your Perfect Stay</h5>
                    </div>
                </div>
            </div>

            <div id="contact" className="grid grid-cols-1 lg:grid-cols-3 gap-[3rem] w-[95%] md:w-[70%] lg:w-[80%] mx-auto mt-[5.5rem]">
                {/* left Section */}
                <section className="text-[#121212] lg:col-span-1 font-[50] gap-y-3">
                    <h6 className="text-[#76be81] text-[1.2rem] font-serif">CONTACT US</h6>
                    <h1 className="py-2 text-[2rem] font-serif tracking-wide ">Ready to Contact Us </h1>
                    {/* location */}
                    <div className="bg-[#f2fcf4] p-8 rounded-lg mt-4" >
                        <div className="bg-[#76be81] flex w-[40%] md:w-[20%] lg:w-[40%] rounded-md py-2 justify-center items-start">
                            <MapPin className="fill-white text-[#76be81]" size={50} />
                        </div>
                        <p className="py-2 text-gray-800 tracking-wide text-[0.9rem] ">Location</p>
                        <strong className="tracking-wide font-semibold pt-1" >Electric Brixton, Town Hall Parade, Brixton Hill, London SW2 1RJ, United Kingdom</strong>
                    </div>
                    {/* email */}
                    <div className="bg-[#f2fcf4] p-8 rounded-lg mt-7" >
                        <div className="bg-[#76be81] flex w-[40%] md:w-[20%] lg:w-[40%] rounded-md py-3 justify-center items-start">
                            <Mail className=" text-[#76be81]" color="white" size={45} />
                        </div>
                        <p className="py-2 text-gray-800 tracking-wide text-[0.9rem] ">Email Address</p>
                        <strong className="tracking-wide font-semibold pt-1" >sunrise_stay_hotel@gmail.com</strong>
                    </div>
                    {/* phone */}
                    <div className="bg-[#f2fcf4] p-8 rounded-lg mt-7" >
                        <div className="bg-[#76be81] flex w-[40%] md:w-[20%] lg:w-[40%] rounded-md py-3 justify-center items-start">
                            <Phone className=" fill-white" color="white" size={35} />
                        </div>
                        <p className="py-2 text-gray-800 tracking-wide text-[0.9rem] ">Phone No</p>
                        <strong className="tracking-wide font-semibold pt-1" >+234 802 714 5876</strong>
                    </div>
                   
                   
                </section>

                {/* right section */}
                <section className="lg:col-span-2  lg:pl-10">
                    <h3 className="text-[1.7rem] md:text-[2.2rem] font-serif tracking-wide font-extralight ">
                    Send Us A Message
                    </h3>
                    <p className="pt-3 md:py-2 text-sm text-gray-700">Have a question or ready to book? Send us a message and we'll respond promptly.</p>

                    <ContactForm />
                </section>
            </div>

            {/* Google Map */}
            <section className="w-full mt-20 mb-2 rounded-lg overflow-hidden ">
                <iframe className="h-[450px] w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1242.9454206045189!2d-0.11792063728619723!3d51.460160585851405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604682c32904b%3A0xe78364033af11ca3!2sElectric%20Brixton!5e0!3m2!1sen!2sng!4v1769356849601!5m2!1sen!2sng"></iframe>
            </section>

            <Footer />
        </section>
    )
}
export default ContactPage