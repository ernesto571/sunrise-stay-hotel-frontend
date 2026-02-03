import { ChevronRightCircle, PhoneCallIcon } from "lucide-react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function About() {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const navigate = useNavigate()
    
    useGSAP(() => {

        const config = {
            duration: 0.5,
            start: isMobile ? 'bottom 45%' : 'top 85%',
        };

        gsap.from('.image', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.image',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('.title', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.title',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('#subtitle', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            delay: isMobile ? 0.15 : 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#subtitle',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('#subtitle-2', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            delay: isMobile ? 0.2 : 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#subtitle-2',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('#icons', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            delay: isMobile ? 0.25 : 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#icons',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('.text-2', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            delay: isMobile ? 0.3 : 0.25,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.text-2',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('.text-3', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            delay: isMobile ? 0.35 : 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.text-3',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });

        gsap.from('#buttons', {
            opacity: 0, 
            y: 30,
            duration: config.duration,
            delay: isMobile ? 0.4 : 0.35,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#buttons',
                start: config.start,
                toggleActions: 'play none none none',
            }
        });
        
    }, [isMobile]);

    return(
        <section id="about">
            <div className="mt-[8rem] w-[95%] md:w-[90%] lg:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-11">
                <div className="image flex relative">
                    <div className="flex relative ">
                        <img src="/about-1.jpg" alt="" className="rounded-[15px] relative h-[90%] w-[90%] lg:w-[85%] transition-[filter,transform] duration-[400ms,300ms] ease-in-out hover:blur-[3px]" />
                        
                        <img src="/about-02.jpg" alt="" className="absolute bottom-[-3px] right-[0.1rem] lg:right-[-1rem] w-[60%] h-[45%] border-[10px] border-white rounded-lg transition-[filter,transform] duration-[400ms,300ms] ease-in-out hover:blur-[3px]"/>
                    </div>

                    <span className="hidden lg:flex lg:flex-col absolute right-[3rem] top-[6rem] bg-[#262626] w-[35%] h-[43%] justify-center items-center text-center rounded-[10px]">
                        <img src="/award.svg" alt="" className=" w-24 "/>
                        <p className="text-white font-serif text-[1.1rem]">AWARD WINING HOTEL</p>
                    </span>
                </div>

                <div>
                    <h6 className="title font-serif text-[#76be81] tracking-wide font-extralight">ABOUT US</h6>
                    <h1 id="subtitle" className="w-[80%] lg:w-full mt-5 font-serif text-gray-900 tracking-wide text-[2.1rem] lg:text-[2.7rem] font-thin">More Than a Hotel – A Tradition of Excellence</h1>

                    <p id="subtitle-2" className="text-gray-700 font-light tracking-wide leading-loose pt-4 text-[0.9rem]">At our hotel, luxury is more than just a word — it's a tradition. From exquisite design to personalized service, every detail is thoughtfully curated to create unforgettable experiences. Whether you're here for relaxation or celebration, we offer more than a stay — we offer a legacy of comfort, elegance, and world-class hospitality.</p>

                    <div id="icons" className="grid lg:flex gap-3 lg:gap-9 mt-8 lg:mt-6">
                        <span className="flex w-[60%] lg:w-[40%] gap-5 items-center">
                            <img src="/icon-1.png" alt="" />
                            <p className="font-serif text-gray-800 text-[1.3rem]">The Greatest Lighting</p>
                        </span>

                        <span className="flex w-[60%] lg:w-[30%] gap-5 items-center">
                            <img src="/icon-2.png" alt="" />
                            <p className="font-serif text-gray-800 text-[1.3rem]">Pick Up & Drop</p>
                        </span>
                    </div>

                    <span className="text-2 flex gap-3 mt-8 mb-5">
                        <ChevronRightCircle className="text-white flex fill-[#76be81]"/>
                        <p className="font-serif text-gray-800 text-[1.1rem]">Morning Meals for Everyone</p>
                    </span>

                    <span className="text-3 flex gap-3 mb-6">
                        <ChevronRightCircle className="text-white flex fill-[#76be81]"/>
                        <p className="font-serif text-[#1c1c1c] text-[1.1rem]">The Best Parking Space</p>
                    </span>
                    
                    <span id="buttons" className="grid md:flex lg:flex gap-10 lg:gap-[5rem] mt-6 lg:mt-1">
                        <button onClick={()=> {navigate("/contact-us")}} className="py-3 w-[50%] md:w-[30%] lg:w-[35%] lg:px-8 rounded-[6px] bg-[#76be81] text-white hover:bg-[#1c1c1c] hover:text-white duration-100 ease-in">CONTACT US</button>

                        <span className="flex items-center">
                            <span className="p-4 rounded-full bg-[#1c1c1c]">
                                <PhoneCallIcon color="white" size={20}/>
                            </span>
                            
                            <div className="pl-3">
                                <p className="pb-1 text-[#1c1c1c]">Booking Now</p>
                                <p className="text-[#76be81]">080 2741 5876</p>
                            </div>
                        </span>
                    </span>
                </div>
            </div>
        </section>
    )
}

export default About