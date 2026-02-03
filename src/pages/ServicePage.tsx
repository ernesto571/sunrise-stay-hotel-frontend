import { ChevronRightCircle } from "lucide-react";
import { services } from "../constants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Footer from "../components/Footer";

function ServicePage (){

    useGSAP(() => {
        // Only run animation when loading is complete
        const tilteSplit = new SplitText("#service-title", { type: 'chars, words' })
        const subtitleSplit = new SplitText("#service-subtitle", { type: 'lines' })
    
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
    
        gsap.from('#services', {
            opacity:0,
            duration: 0.5,
            ease: "expo.out",
            delay:1.7
        })
      
    }, [])

    return (
        <section>
            <div className="relative w-full h-[320px] md:h-[350px] lg:h-[400px] overflow-hidden">
                <img 
                    src="/room-details-img.jpg"
                    className="w-full h-full object-cover"
                    alt=""
                />
                <div className="grid absolute inset-0 items-center justify-center text-center font-serif tracking-wider text-white">
                    <div className="w-[90%] md:w-[80%] mx-auto">
                        <h2 id="service-title" className="text-[2.2rem] md:text-[3rem] lg:text-[3.5rem]">Our Services</h2>
                        <h5 id="service-subtitle" className=" md:text-[1.2rem] mt-3 lg:mt-5 ">Thoughtfully curated services designed to make every moment of your stay effortless and memorable.</h5>
                    </div>
                </div>
            </div>
            <section id="services" className="my-[4rem]">
                {services.map((s) => {
                    const isOdd = s.id % 2 === 1;
                    
                    return (
                        <div
                        key={s.id}
                        className={`grid grid-cols-1 md:flex gap-8 mt-9 w-[90%] lg:w-[80%] mx-auto ${
                            isOdd ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`} >
                            <div className=" relative justify h-[300px] w-full">
                                <img 
                                    src={s.img} 
                                    alt="" 
                                    className="w-full h-full object-cover rounded-[8px] hover:cursor-pointer hover:blur-[1px]" 
                                /> 
                                <div className="absolute top-2 md:top-3 lg:top-4 right-3 md:right-4 lg:right-5 z-20 bg-[#234c48] rounded-[10px]">
                                    <p className="text-white text-sm md:text-base lg:text-base p-3 lg:p-3 ">${s.price}.00 </p>
                                </div>                    
                            </div>
                            
                            <span className="flex flex-col gap-y-2 col-span-2 font-[50] justify-center">
                                <h1 className="text-[#76be81] text-sm lg:text-base  ">{s.title}</h1>
                                <h2 className="text-[#234c48]  lg:text-[1.2rem] ">
                                    {s.description}
                                </h2>
                                {s.includes.map((include, idx) => (
                                <span key={idx} className="flex gap-2 items-center py-2">
                                    <ChevronRightCircle className="text-[#76be81] fill-[#f8f8f8]" />
                                    <p>{include}</p>
                                </span>
                                ))}
                            </span>
                        </div>
                    );
                })}
            </section>

            <Footer />
        </section>
    )
}
export default ServicePage