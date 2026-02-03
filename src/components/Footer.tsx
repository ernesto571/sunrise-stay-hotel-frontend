import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer (){

    return(
        <section className="bg-[#1c1c1c] relative min-h-[80vh] md:min-h-[70vh] lg:min-h-[65vh]">                <img 
                src="/footer-img.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover" 
            />
            
            <div className="relative pt-[4rem] pb-[4rem] z-10">
                {/* input bar */}
                <div className="w-[95%] lg:w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto items-center gap-6 md:gap-0">
                    <h1 className="font-serif text-[2.2rem] lg:text-[2.8rem] text-white tracking-wide">Join Our Newsletter</h1>
                    
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            placeholder="Enter Your Email"  
                            className="w-full border border-[#3e3e3e] rounded-[4px] bg-inherit py-3 pl-4 pr-[130px] text-white placeholder:text-gray-400 outline-none"
                        />
                        <button className="absolute bg-[#76be81] right-1 top-1/2 -translate-y-1/2 py-2 px-5 rounded-[4px] text-white hover:bg-black duration-500 ease-in-out whitespace-nowrap">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                {/* bottom */}
                <div className="w-[95%] lg:w-[85%] mx-auto border-t border-[#3e3e3e] mt-[3rem]">
                    <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-6">
                        <span className="text-white col-span-2 md:col-span-1 lg:col-span-1">
                            <h1 className="text-[2rem] font-serif font-extralight">Sunrise-Stay Hotel</h1>
                            <p className="pt-4 text-sm text-gray-200 font-light leading-relaxed">Providing comfort, luxury, and exceptional experiences—perfect for every traveler seeking a memorable stay.</p>
                            <div className="flex gap-3 mt-4 mb-3">
                                <a href="#" className="hover:text-[#76be81] transition-colors duration-300">
                                    <Github />
                                </a>
                                <a href="#" className="hover:text-[#76be81] transition-colors duration-300">
                                    <Linkedin />
                                </a>
                                <a href="#" className="hover:text-[#76be81] transition-colors duration-300">
                                    <Twitter />
                                </a>
                                <a href="#" className="hover:text-[#76be81] transition-colors duration-300">
                                    <Facebook />
                                </a>
                            </div>
                        </span>

                        {/* quick links */}
                        <span className="flex flex-col text-white lg:pl-[3rem] pl-0 tracking-wide">
                            <h1 className="text-[1.5rem] lg:text-[2rem] font-serif font-extralight pb-1">Quick Links</h1>
                            <Link to="/" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Home</Link>
                            <Link to="/rooms" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Rooms</Link>
                            <Link to="/contact-us" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Contact</Link>
                            <Link to="/sign-in" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Sign In</Link>
                        </span>

                        {/* guest service */}
                        <span className="text-white tracking-wide">
                            <h1 className="text-[1.5rem] lg:text-[2rem] font-serif font-extralight pb-1">Guest Services</h1>
                            <p className="py-2 text-sm">24/7 Front Desk</p>
                            <p className="py-2 text-sm">Parking</p>
                            <p className="py-2 text-sm">Room Service</p>
                            <p className="py-2 text-sm">Free Wi-fi</p>
                        </span>

                        {/* contact */}
                        <span className="text-white tracking-wide col-span-2 md:col-span-1 lg:col-span-1">
                            <h1 className="text-[1.5rem] lg:text-[2rem] font-serif font-extralight pb-1">Contact Us</h1>
                            <p className="py-2 text-sm leading-relaxed">Electric Brixton, Town Hall Parade, Brixton Hill, London SW2 1RJ, United Kingdom</p>
                            <p className="py-3 text-sm">080 471 5876</p>
                            <p className="py-2 text-sm">Mon-Fri 8:00am - 6:00pm</p>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Footer;