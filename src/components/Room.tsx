import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRoomTypeStore } from "../store/RoomTypeStore";
import Loading from "./Loading";
import { BedSingle, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger);

function Room() {
  const { roomTypes, fetchRoomTypes, loading } = useRoomTypeStore();
  
  const isMobile = useMediaQuery({ maxWidth: 768 })
    
  useGSAP(() => {
    if (loading) return; // Don't animate while loading

    const config = {
      duration: 0.5,
      stagger: isMobile ? 0.15 : 0.1,
      start: 'top 85%',
    };

    gsap.from('#title-2', {
      opacity: 0, 
      y: 30,
      duration: config.duration,
      delay: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '#title-2',
        start: config.start,
        toggleActions: 'play none none none',
      }
    });

    // Animate the entire slider container instead of individual cards
    gsap.from('.slider-container', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.slider-container',
        start: isMobile ? "top 90%" : "top 95%",
        toggleActions: 'play none none none',
      }
    });
      
  }, [loading, isMobile]);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3.5,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    swipeToSlide: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  if (loading) {
    return <Loading />
  }
  
  return (
    <section className="mt-[5rem] lg:mt-[7rem] pb-[7rem] bg-[#f2fcf4]">
      <main>
        <div className="items-center pl-[4%] pt-[4rem]">
          <h5 id="title" className="tracking-wider font-serif text-[#76be81]">ROOMS</h5>
          <h1 id="title-2" className="text-[2rem] md:text-[2.4rem] lg:text-[2.6rem] font-lighter tracking-wide font-serif w-[90%] lg:w-[45%]">
            Reste's Exclusive Rooms & Suites
          </h1>
        </div>
        <div className="slider-container mt-[3rem] w-full overflow-hidden">
          <Slider {...settings}>
            {roomTypes.map((room, i) => (
              <div key={room.id} className="px-2 md:px-3">
                <div className={`room-card bg-white rounded-b-[10px] ${i % 2 !== 0 ? "mt-7" : "mt-0"}`}>
                  <div className="h-[220px] md:h-[250px] lg:h-[270px] rounded-lg relative transform transition duration-300">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover rounded-t-[8px] transition-[filter,transform] duration-[400ms,300ms] ease-in-out hover:blur-[3px]"/>
                    <div className="absolute top-2 md:top-3 lg:top-4 right-3 md:right-4 lg:right-5 z-20 bg-[#76be81] rounded-[10px]">
                      <p className="text-white text-sm md:text-base lg:text-base p-2 lg:p-3 ">${room.price_per_night} / NIGHT</p>
                    </div>
                  </div>
                  <div className="mt-6 pb-6 w-[95%] md:w-[90%] lg:w-[90%] mx-auto">
                    <span className="font-serif tracking-wide font-lighter">
                      <p className="text-[#76be81] text-base lg:text-[1.2rem] pb-3">{room.name}</p>
                      <Link to={`/rooms/${room.name}`} className="text-[#666666] text-[1.1rem] lg:text-[1.3rem] lg:whitespace-nowrap hover:text-[#76be81] hover:underline hover:cursor-pointer ease-in-out duration-300 transition-transform">{room.tagline}</Link>
                    </span>
                    <div className="flex gap-4 lg:gap-7 pt-4 text-sm lg:text-base">
                      <span className="flex gap-2 text-[#666666] items-center">
                        <BedSingle color="white" className="fill-[#666666]" />
                        <p>{room.size_sqm} SQ.FT/Rooms</p>
                      </span>
                      <span className="text-[#666666] flex gap-2 items-center">
                        <User className="fill-[#666666] text-[#666666]" />
                        <p>0{room.max_adults + room.max_children} Guests</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </main>
    </section>
  );
}
export default Room;