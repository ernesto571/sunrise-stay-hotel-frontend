import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { facilities } from "../constants";

gsap.registerPlugin(ScrollTrigger);

function Facility(){
    useGSAP(() => {
        gsap.from('#title', {
            opacity: 0, 
            y: 30,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#title',
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
        
        gsap.from('#sub-title', {
            opacity: 0, 
            y: 30,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#sub-title',
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
        
        gsap.set('.facility-card', { 
            opacity: 0, 
            y: 50 
        });
        
        gsap.to('.facility-card', {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.facility-card',
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
        
    }, []);

    return(
        <main id="facilities" className="bg-white">
            <section className='mt-8 relative'>
                <span className="font-extralight">
                    <h3 id="title" className="font-serif text-center text-[#76be81] tracking-wide text-base lg:text-[1.2rem]">FACILITIES</h3>
                    <h1 id="sub-title" className="font-serif text-center text-gray-900 tracking-wide text-[1.8rem] md:text-[2.1rem] lg:text-[2.3rem] pt-7 font-light">Hotel's Facilities</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10 w-[85%] md:w-[90%] lg:w-[85%] mx-auto mt-7 lg:mt-8">
                        {facilities.map((facility) => {
                            const Icon = facility.icon;
                            return(
                                <span
                                    key={facility.id}
                                    className="facility-card bg-[#f2fcf4] flex flex-col items-center justify-center text-center py-10 hover:border hover:border-[#76be81] ease-out duration-200 rounded-md"
                                >
                                    <Icon className="text-[#76be81] pb-4" size={60}/>
                                    <p className="font-serif text-[1.2rem] font-extralight text-gray-800 tracking-wide">{facility.name}</p>
                                </span>
                            );
                        })}
                    </div>
                </span>
                
                <div className="right-0 absolute bottom-[-10rem]">
                    <img src="/right-shape02.png" alt="" className="object-cover" />
                </div>
            </section>
        </main>
    );
}

export default Facility;