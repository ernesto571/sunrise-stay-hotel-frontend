import { useEffect, useState } from "react";
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
  
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch room types first
  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotate only after roomTypes are loaded
  useEffect(() => {
    if (!roomTypes || roomTypes.length === 0) return;
    
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % roomTypes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [roomTypes]);
    
  useGSAP(() => {
    if (loading || !roomTypes || roomTypes.length === 0) return;

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

    gsap.from('.room-card', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: config.stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.grid-container',
        start: isMobile ? "top 90%" : "top 95%",
        toggleActions: 'play none none none',
      }
    });
      
  }, [loading, isMobile, roomTypes]);

  // Show loading state
  if (loading) {
    return <Loading />
  }
  
  // Show empty state
  if (!roomTypes || roomTypes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">No rooms available</p>
      </div>
    );
  }

  // Calculate visible rooms only after roomTypes are available
  const CENTER_INDEX = Math.floor(visibleCount / 2);
  const visibleRoom = Array.from({ length: visibleCount }, (_, i) => {
    const serviceIndex = (index - CENTER_INDEX + i + roomTypes.length) % roomTypes.length;
    return roomTypes[serviceIndex];
  });
  
  return (
    <section className="mt-[5rem] lg:mt-[7rem] pb-[7rem] bg-[#f2fcf4]">
      <main>
        <div className="items-center pl-[4%] pt-[4rem]">
          <h5 id="title" className="tracking-wider font-serif text-[#76be81]">ROOMS</h5>
          <h1 id="title-2" className="text-[2rem] md:text-[2.4rem] lg:text-[2.6rem] font-lighter tracking-wide font-serif w-[90%] lg:w-[45%]">
            Reste's Exclusive Rooms & Suites
          </h1>
        </div>
        <div className="overflow-hidden mt-[3rem] w-full">
          <div 
            className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-transform duration-700 ease-in-out" >
            {visibleRoom.map((room, i) => {
              const isActive = i === CENTER_INDEX;
              return (
                <div 
                  key={room.id} 
                  className={`px-3 md:px-4 transition-all duration-700 ${isActive ? "translate-y-4" : ""}`} >
                  <div className="room-card bg-white rounded-b-[10px] transition-all duration-700">
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
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
}
export default Room;