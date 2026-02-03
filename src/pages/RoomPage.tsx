import { useEffect } from "react";
import Loading from "../components/Loading";
import { useRoomTypeStore } from "../store/RoomTypeStore";
import { BedSingle, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Footer from "../components/Footer";

function RoomPage(){
    const { roomTypes, fetchRoomTypes, loading } = useRoomTypeStore();
    const navigate = useNavigate();

    useGSAP(() => {
        // Only run animation when loading is complete
        if (!loading) {
          const tilteSplit = new SplitText("#room-title", { type: 'chars, words' })
          const subtitleSplit = new SplitText("#room-subtitle", { type: 'lines' })
      
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
      
          gsap.from('#room-types', {
            opacity:0,
            duration: 0.5,
            ease: "expo.out",
            delay:1.7
          })
      
        }
    }, [loading])
  
    useEffect(() => {
        fetchRoomTypes();
    }, []);

    if (loading){
        return <Loading/>
    }

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
                        <h2 id="room-title" className="text-[2.2rem] md:text-[3rem]">Rooms & Suites</h2>
                        <h5 id="room-subtitle" className="text-[1.2rem] md:text-[1.5rem] mt-3 lg:mt-5">Where Comfort Meets Elegance</h5>
                    </div>
                </div>
            </div>

            {/* list of rooms */}
            <section id="room-types" className="my-[4rem]">
                {roomTypes.map((room) => {
                    const isOdd = room.id % 2 === 1;
                    
                    return (
                        <div 
                            key={room.id} 
                            className={`grid md:flex gap-8 mt-9 w-[90%] md:w-[95%] lg:w-[80%] mx-auto ${
                                isOdd ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                        >
                            <div className="relative w-full h-[270px]">
                                <img 
                                    src={room.image} 
                                    alt="" 
                                    onClick={() => navigate(`/rooms/${room.name}`)} 
                                    className="w-full h-full object-cover rounded-t-[8px] hover:cursor-pointer hover:blur-[1px]" 
                                /> 
                                <div className="absolute top-2 md:top-3 lg:top-4 right-3 md:right-4 lg:right-5 z-20 bg-[#234c48] rounded-[10px]">
                                    <p className="text-white text-sm md:text-base lg:text-base p-2 lg:p-3 ">${room.price_per_night} / NIGHT</p>
                                </div>                    
                            </div>
                            
                            <span className="flex flex-col justify-center font-extralight gap-y-2">
                                <h1 className="text-[#76be81] text-base lg:text-[1.2rem] ">{room.name}</h1>
                                <Link 
                                    to={`/rooms/${room.name}`} 
                                    className="text-[#234c48] text-[1.3rem] lg:text-[1.5rem] lg:whitespace-nowrap hover:underline hover:cursor-pointer ease-in-out duration-300 transition-transform"
                                >
                                    {room.tagline}
                                </Link>
                                <h3 className="text-gray-900 pt-3">{room.description}</h3>
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
                                <div className="mt-2">
                                    <button onClick={() => navigate(`/rooms/${room.name}`)} className="px-6 py-3 bg-[#234c48] text-white border border-white font-semibold rounded-[5px] hover:bg-gray-900 ease-in-out duration-200">
                                        More Details
                                    </button>
                                </div>
                            </span>
                        </div>
                    );
                })}
            </section>
            
            <Footer />
        </section>
    )
}

export default RoomPage;