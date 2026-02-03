import { useParams, useNavigate } from "react-router-dom";
import { useRoomTypeStore } from "../store/RoomTypeStore";
import { useBookingStore } from "../store/BookingStore";
import { CheckCircle2, Calendar, Users, Baby } from "lucide-react";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Footer from "../components/Footer";

function RoomDetails() {
  const { RoomName } = useParams();
  const navigate = useNavigate();
  const { roomTypes, loading, fetchRoomTypes } = useRoomTypeStore();
  const { createBooking, loading: bookingLoading, error: bookingError } = useBookingStore();

  useGSAP(() => {
    // Only run animation when loading is complete
    if (!loading) {
      const tilteSplit = new SplitText("#room-details-title", { type: 'chars, words' })
      const subtitleSplit = new SplitText("#room-details-subtitle", { type: 'lines' })
  
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
  
      gsap.from('#room-details', {
        opacity:0,
        duration: 0.5,
        ease: "expo.out",
        delay:1.7
      })
  
    }
  }, [loading])

  const [formData, setFormData] = useState({
    room_type_name: "",
    check_in: "",
    check_out: "",
    adults: 1,
    children: 0,
  });

  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const decodedName = decodeURIComponent(RoomName || "");

  // Fetch if store is empty (page reload case)
  useEffect(() => {
    if (roomTypes.length === 0) {
      fetchRoomTypes();
    }
  }, [roomTypes.length, fetchRoomTypes]);

  if (loading || roomTypes.length === 0) {
    return <Loading />;
  }

  const room = roomTypes.find((r) => r.name === decodedName);

  if (!room) {
    return (
      <div className="min-h-screen grid place-items-center">
        Room not found
      </div>
    );
  }

  // Set room name when room is found
  if (formData.room_type_name !== room.name) {
    setFormData((prev) => ({ ...prev, room_type_name: room.name }));
  }

  // Calculate nights and total price when dates change
  const handleDateChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    if (updatedData.check_in && updatedData.check_out) {
      const checkIn = new Date(updatedData.check_in);
      const checkOut = new Date(updatedData.check_out);
      const nightsCount = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (nightsCount > 0) {
        setNights(nightsCount);
        setTotalPrice(nightsCount * room.price_per_night);
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBooking(formData);
      // Redirect to payment page
      navigate("/payment");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="min-h-screen">
      {/* Image wrapper */}
      <div className="relative w-full h-[320px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/room-details-img.jpg"
          className="w-full h-full object-cover"
          alt="Rooms"
        />
        <div className="grid absolute inset-0 items-center justify-center text-center font-serif tracking-wider text-white">
          <div>
            <h2 id="room-details-title" className="text-[2.2rem] md:text-[3rem]">
              {room.name}
            </h2>
            <h5 id="room-details-subtitle" className=" md:text-[1.2rem] mt-3 lg:mt-5">
              {room.tagline}
            </h5>
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="room-details" className="grid grid-cols-1  lg:grid-cols-3 w-[95%] md:w-[80%] mx-auto gap-[3rem] mt-[4rem] lg:mt-[8rem] mb-[4rem] justify-center items-center">
        {/* left section */}
        <section className="lg:col-span-2">
          <div className="w-full h-[320px] lg:h-[380px]">
            <img
              src={room.image}
              className="w-full h-full object-cover rounded-t-[8px]"
            />
          </div>

          <div className="mt-4 font-serif font-extralight">
            <p className="text-[#76be81] text-[1.2rem]">{room.name}</p>
            <h1 className="text-[1.8rem] py-2 text-[#1c1c1c]">
              {room.tagline}
            </h1>
            <p className="text-gray-800 font-sans leading-relaxed">
              {room.description}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 font-thin text-gray-800 gap-5">
            <span className="flex flex-col gap-5">
              <div className="flex gap-2">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p> Check-In:</p>
              </div>

              <div className="flex gap-2">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>Check-in from {room.check_in_time} - anytime </p>
              </div>

              <div className="flex gap-2 ">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>Early Arrival is Contingent Upon Availability. </p>
              </div>
            </span>

            <span className="flex flex-col gap-5">
              <div className="flex gap-2">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p> Check Out</p>
              </div>

              <div className="flex gap-2">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>Leave by Midday</p>
              </div>

              <div className="flex gap-2">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>
                  {" "}
                  Check - Out is At Any Time Starting {room.check_out_time}.{" "}
                </p>
              </div>
            </span>
          </div>

          {/* room features */}
          <div className="mt-5">
            <h1 className="text-[1.6rem] font-thin py-2 font-serif text-[#1c1c1c] tracking-wide">
              What We Offer:
            </h1>
            {room.features.map((feature, index) => (
              <span key={index} className="flex pt-2 gap-2 tracking-wide">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>{feature}</p>
              </span>
            ))}
          </div>

          {/* house rules */}
          <div className="mt-5">
            <h1 className="text-[1.6rem] font-thin py-1 font-serif text-[#1c1c1c] tracking-wide">
              House Rules
            </h1>
            <p className="text-gray-800">{room.house_rules}</p>
          </div>

          {/* booking info */}
          <div className="mt-5">
            <h1 className="text-[1.6rem] font-thin py-1 font-serif text-[#1c1c1c] tracking-wide">
              Booking Information:
            </h1>
            {/* occupancy */}
            <span>
              <div className="flex pt-2 gap-2 tracking-wide font-semibold">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>Occupancy:</p>
              </div>
              <div className="text-gray-800 py-2">
                {room.max_children == 0 ? (
                  <p>Up to {room.max_adults} adults</p>
                ) : (
                  <p>
                    Up to {room.max_adults} adults + {room.max_children}{" "}
                    children
                  </p>
                )}
              </div>
            </span>
            {/* inclusion */}
            <span>
              <div className="flex pt-2 gap-2 tracking-wide font-semibold">
                <CheckCircle2 color="white" className="fill-[#76be81]" />
                <p>Inclusions:</p>
              </div>
              <p className="text-gray-800 py-2">
                {room.inclusions.join(", ")}
              </p>
            </span>
          </div>
        </section>

        {/* RIGHT SECTION - BOOKING FORM */}
        <section className="sticky top-4 h-fit ">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 ">
            <div className="mb-6">
              <h2 className="text-[1.8rem] font-serif font-light text-[#1c1c1c]">
                Book Your Stay
              </h2>
              <p className="text-[1.7rem] md:text-[2rem] font-bold text-[#76be81] mt-2">
                ${room.price_per_night}
                <span className="text-sm text-gray-600 font-normal">
                  {" "}
                  / night
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Check-in Date */}
              <div>
                <label
                  htmlFor="check_in"
                  className="flex items-center gap-2 text-gray-700 font-medium mb-2"
                >
                  <Calendar size={18} />
                  Check-In *
                </label>
                <input
                  type="date"
                  id="check_in"
                  value={formData.check_in}
                  onChange={(e) => handleDateChange("check_in", e.target.value)}
                  min={today}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76be81] focus:border-transparent"
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label
                  htmlFor="check_out"
                  className="flex items-center gap-2 text-gray-700 font-medium mb-2"
                >
                  <Calendar size={18} />
                  Check-Out *
                </label>
                <input
                  type="date"
                  id="check_out"
                  value={formData.check_out}
                  onChange={(e) =>
                    handleDateChange("check_out", e.target.value)
                  }
                  min={formData.check_in || today}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76be81] focus:border-transparent"
                />
              </div>

              {/* Adults */}
              <div>
                <label
                  htmlFor="adults"
                  className="flex items-center gap-2 text-gray-700 font-medium mb-2"
                >
                  <Users size={18} />
                  Adults *
                </label>
                <select
                  id="adults"
                  value={formData.adults}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adults: parseInt(e.target.value),
                    })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76be81] focus:border-transparent"
                >
                  {[...Array(room.max_adults)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Children */}
              {room.max_children > 0 && (
                <div>
                  <label
                    htmlFor="children"
                    className="flex items-center gap-2 text-gray-700 font-medium mb-2"
                  >
                    <Baby size={18} />
                    Children
                  </label>
                  <select
                    id="children"
                    value={formData.children}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        children: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#76be81] focus:border-transparent"
                  >
                    {[...Array(room.max_children + 1)].map((_, i) => (
                      <option key={i} value={i}>
                        {i} {i === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Summary */}
              {nights > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>
                      ${room.price_per_night} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#76be81]">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {bookingError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {bookingError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingLoading || nights <= 0}
                className="w-full bg-[#76be81] hover:bg-[#5fa56a] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {bookingLoading ? "Processing..." : "Reserve Now"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                You won't be charged yet
              </p>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex gap-2">
              <CheckCircle2
                size={20}
                className="fill-blue-600 text-white flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-blue-900">Free cancellation</p>
                <p className="text-sm text-blue-700">
                  Cancel up to 24 hours before check-in for a full refund
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </section>
  );
}

export default RoomDetails;