import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/BookingStore";
import { CheckCircle, Calendar, Users, MapPin, Home, CalendarCheck, Bed } from "lucide-react";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

export default function BookingSuccessPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { currentBooking, fetchBookingById, loading, resetBooking } = useBookingStore();

  useGSAP(() => {
    // Only run animation when loading is complete
    if (!loading) {
      
      gsap.set('#success-icon', {
        opacity:0,
        y:40,
        delay:0.7
      })

      gsap.to('#success-icon', {
        opacity:2,
        duration: 1,
        y:0,
        ease: "expo.out",
      })
  
    }
  }, [loading])

  useEffect(() => {
    if (bookingId) {
      fetchBookingById(bookingId);
    }

    // Cleanup on unmount
    return () => {
      resetBooking();
    };
  }, [bookingId, fetchBookingById, resetBooking]);

  // Safe price conversion function
  const getTotalPrice = () => {
    if (!currentBooking) return 0;
    
    const price = currentBooking.total_price;
    
    // If it's already a number, return it
    if (typeof price === 'number') {
      return price;
    }
    
    // If it's a string, try to parse it
    if (typeof price === 'string') {
      const parsed = parseFloat(price);
      return isNaN(parsed) ? 0 : parsed;
    }
    
    // Default to 0 if undefined or invalid
    return 0;
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Booking not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        {/* Success Animation Container */}
        <div className="text-center mb-12 animate-fade-in">
          {/* Animated checkmark */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
            <div id="success-icon" className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-6 shadow-2xl shadow-emerald-200">
              <CheckCircle size={64} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Success message */}
          <h1 className="text-3xl md:text-5xl font-serif font-light text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className=" md:text-xl text-gray-600 mb-2">
            Your reservation has been successfully confirmed
          </p>
          <p className="text-gray-500">
            Confirmation details have been sent to your email
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-12 mb-8 border border-gray-100">
          {/* Booking ID */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-gray-900 font-mono">
                #{currentBooking.id.toString().slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm">
              {(currentBooking.status || 'pending').toUpperCase()}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Check-in/out */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Calendar className="text-emerald-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Check-in</p>
                  <p className="md:text-lg font-semibold text-gray-900">
                    {currentBooking.check_in ? new Date(currentBooking.check_in).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">After 3:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Check-out</p>
                  <p className="md:text-lg font-semibold text-gray-900">
                    {currentBooking.check_out ? new Date(currentBooking.check_out).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Before 11:00 AM</p>
                </div>
              </div>
            </div>

            {/* Room & Guests */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <MapPin className="text-purple-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Room</p>
                  <p className="md:text-lg font-semibold text-gray-900">
                    Room {currentBooking.room_number || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Users className="text-orange-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Guests</p>
                  <p className="md:text-lg font-semibold text-gray-900">
                    {currentBooking.adults || 0} {(currentBooking.adults || 0) === 1 ? "Adult" : "Adults"}
                    {(currentBooking.children || 0) > 0 &&
                      `, ${currentBooking.children} ${
                        currentBooking.children === 1 ? "Child" : "Children"
                      }`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Total Amount</span>
                <span className="font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Payment Status</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  {(currentBooking.payment_status || 'unpaid').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button onClick={() => navigate("/rooms")} className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 transition-all">
            <Bed size={20} />
            Browse Rooms
          </button>
          <button onClick={() => navigate("/my-bookings")} className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 transition-all">
            <CalendarCheck size={20} />
            View Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            <Home size={20} />
            Return Home
          </button>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3 text-lg">
            Important Information
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Please bring a valid ID and your booking confirmation on check-in
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Free cancellation up to 24 hours before check-in
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                For any changes or questions, please contact our support team
              </span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />                
    </div>
  );
}