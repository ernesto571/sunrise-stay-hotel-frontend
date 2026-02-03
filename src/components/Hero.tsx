import { useHotelImageStore } from "../store/HotelImageStore";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import Loading from "./Loading";
import { overview } from "../constants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { images, fetchHotelImages, loading } = useHotelImageStore();
  const navigate = useNavigate()

  // animation
   useGSAP(() => {
  // Only run animation when loading is complete
  if (!loading) {
    const heroSplit = new SplitText("#hero-title", { type: 'chars, words' })
    const subtitleSplit = new SplitText("#hero-subtitle", { type: 'lines' })

    gsap.from(heroSplit.chars, {
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

    gsap.from('#hero-button', {
      opacity:0,
      duration: 0.5,
      ease: "expo.out",
      delay:1.7
    })

    gsap.from('#hero-img', {
      opacity:0,
      duration: 0.5,
      ease: "expo.out",
      delay:1.7
    })
  }
  }, [loading])

  const [index, setIndex]= useState(0)

  const nextContent= () => {
    setIndex(prev => (prev + 1) % overview.length)
  }

  useEffect(() => {
    // Only set up the interval if there are overview to display
    if (overview && overview.length > 0) {
      const interval = setInterval(() => {
        nextContent();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [overview.length]);

  const current = overview[index];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    swipeToSlide: true,
  };

  useEffect(() => {
    fetchHotelImages();
  }, []);

  if (loading){
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-[#1a4042] overflow-hidden">
      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 relative mt-4 lg:mt-8 mb-6">
        {/* TEXT COLUMN */}
        <div className="lg:col-span-2 mt-[5rem] lg:mt-[12rem] ml-3 md:ml-10 lg:ml-10 z-20 font-extralight">
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-white text-white"
                strokeWidth={1}
              />
            ))}
          </div>

          <h2 id="hero-title" className="text-white text-[2.3rem] md:text-[3.5rem] lg:text-[4rem] font-serif lg:whitespace-nowrap ">
            Sunrise-Stay Hotel
          </h2>

          <h2 id="hero-subtitle" className="text-white text-[2.3rem] md:text-[3.5rem] lg:text-[4rem]  font-serif lg:whitespace-nowrap ml-8 md:ml-[6rem] lg:ml-[6rem]">
            Best Hotel In Town
          </h2>

          {/* Buttons */}
          <div id="hero-button" className="mt-8 ml-3 md:ml-[6rem] lg:ml-[6rem]lg:ml-[6rem] flex gap-6">
            <button onClick={() => {navigate(`/contact-us`)}} className="px-6 py-3 bg-[#234c48] text-white border border-white font-semibold rounded-[5px] hover:bg-gray-900 ease-in-out duration-200">
              CONTACT US
            </button>
            <button  onClick={() => {navigate(`/rooms`)}} className="px-6 py-3 border bg-white text-[#1a4042] rounded-[5px] hover:bg-gray-300 ease-in-out duration-200">
              OUR ROOMS
            </button>
          </div>
        </div>

        {/* IMAGE COLUMN */}
        <div id="hero-img" className="w-[94%] mx-auto lg:col-span-3 mt-20 relative z-10">
          <Slider {...settings}>
            {images.map((image) => (
              <div key={image.id} className="w-[90%]">
                <img
                  src={image.image_url}
                  alt=""
                  className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] object-cover rounded-tl-[20px] rounded-bl-[20px] transition-[filter,transform] duration-[400ms,300ms]  ease-in-out hover:blur-[3px]"
                />
              </div>
            ))}
          </Slider>
          
          <div className="text-sm md:text-base lg:text-base absolute bottom-8 left-6 md:left-9 lg:left-12 max-w-md text-white z-20">
            <p className=" leading-relaxed mb-4 ">
              {current.content}
            </p>

            {/* dots */}
            <div className="flex gap-2">
              {overview.map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                    ${
                      i === index
                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-110"
                        : "bg-white/40"
                    }
                  `}
                />
              ))}
            </div>
          </div>

         
        </div>
      </section>

    </main>
  );
}

export default Hero;
