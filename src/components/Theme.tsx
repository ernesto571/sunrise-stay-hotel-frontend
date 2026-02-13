import { useEffect, useState } from "react";
import { useHotelImageStore } from "../store/HotelImageStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger);

function Theme (){

  const isMobile = useMediaQuery({ maxWidth: 768 })

  useGSAP(() => {
    const config = {
      duration: isMobile ? 0.1 : 0.5,
      stagger: isMobile ? 0.15 : 0.1,
      start: isMobile ? 'bottom 110%' : 'bottom 110%',
    };

    gsap.set('.theme-title', { 
      opacity: 0, 
      y: 50 
   });

    gsap.to('.theme-title', {
      opacity: 1, 
      y:0,
      duration: config.duration,
      delay: config.duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.theme-title',
        start: config.start,
        toggleActions: 'play none none none',
      }
    });
      
  }, [isMobile]);
  const { images, fetchHotelImages } = useHotelImageStore();

  useEffect(() => {
      fetchHotelImages();
  }, []);

  const [index, setIndex] = useState(0);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleImage = Array.from({ length: visibleCount }, (_, i) => {
    const serviceIndex = (i + images.length) % images.length;
    return images[serviceIndex];
  });

  const nextImage = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);


    return(
        <section className="bg-[#f2fcf4] mt-[5rem] ">
            <main id='theme' className="font-serif font-extralight">
                <p className="text-base lg:text-[1.2rem] text-[#76be81] text-center pb-4 pt-[3rem] tracking-wide">THROUGH OUR LENSES</p>
                <h1 className="theme-title text-[2rem] md:text-[2.3rem] lg:text-[2.6rem] text-center font-lighter tracking-wide font-serif" >Sunrise-Stay Hotel</h1>
                <div id="theme-pic" className="mt-[3rem]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 transition-transform duration-700 ease-in-out" >
                        {visibleImage.map((image) => (
                        <div key={image.id} className=" w-[100%]">
                            <img
                            src={image.image_url}
                            className="w-full h-[280px] md:px-3 lg:px-3 px-2 object-cover rounded-[14px] transition-[filter,transform] duration-[400ms,300ms]  ease-in-out hover:blur-[3px]"
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    )
}
export default Theme