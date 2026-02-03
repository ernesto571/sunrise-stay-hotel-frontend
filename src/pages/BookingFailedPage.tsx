import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/BookingStore";
import { XCircle, Calendar, Users, MapPin, Home, RefreshCw } from "lucide-react";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export default function BookingFailedPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { currentBooking, fetchBookingById, loading, resetBooking } = useBookingStore();

  useEffect(() => {
    if (bookingId) {
      fetchBookingById(bookingId);
    }

    return () => {
      resetBooking();
    };
  }, [bookingId, fetchBookingById, resetBooking]);

  // Safe price conversion
  const getTotalPrice = () => {
    if (!currentBooking) return 0;
    
    const price = currentBooking.total_price;
    
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const parsed = parseFloat(price);
      return isNaN(parsed) ? 0 : parsed;
    }
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
  const isCancelled = currentBooking.status === "cancelled";

  return (
    <div className="min-h-screen">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none  bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16  bg-gradient-to-br from-red-50 via-white to-gray-50">
        {/* Failed/Cancelled Animation Container */}
        <div className="text-center mb-12">
          {/* Animated X icon */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-red-400/10 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-6 shadow-2xl shadow-red-200">
              <XCircle size={64} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
            {isCancelled ? "Booking Cancelled" : "Booking Failed"}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {isCancelled 
              ? "Your reservation has been cancelled" 
              : "We couldn't complete your reservation"}
          </p>
          <p className="text-gray-500">
            {isCancelled && currentBooking.payment_status === "refunded"
              ? "A full refund has been processed to your payment method"
              : isCancelled
              ? "No charges were applied to your account"
              : "Please try booking again or contact support"}
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-gray-100">
          {/* Booking ID */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-gray-900 font-mono">
                #{currentBooking.id.toString().slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
              isCancelled 
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}>
              {(currentBooking.status || 'cancelled').toUpperCase()}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Check-in/out */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Calendar className="text-gray-600" size={24} />
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
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Calendar className="text-gray-600" size={24} />
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
                </div>
              </div>
            </div>

            {/* Room & Guests */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <MapPin className="text-gray-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Room</p>
                  <p className="md:text-lg font-semibold text-gray-900">
                    Room {currentBooking.room_number || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Users className="text-gray-600" size={24} />
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
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentBooking.payment_status === "refunded"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {(currentBooking.payment_status || 'unpaid').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate("/rooms")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            <RefreshCw size={20} />
            Book Another Room
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 transition-all"
          >
            <Home size={20} />
            Return Home
          </button>
        </div>

        {/* Information Box */}
        <div className={`rounded-2xl p-6 border ${
          isCancelled 
            ? "bg-blue-50 border-blue-100"
            : "bg-gray-50 border-gray-100"
        }`}>
          <h3 className={`font-semibold mb-3 text-lg ${
            isCancelled ? "text-blue-900" : "text-gray-900"
          }`}>
            {isCancelled ? "Cancellation Information" : "What Happened?"}
          </h3>
          <ul className={`space-y-2 ${
            isCancelled ? "text-blue-800" : "text-gray-800"
          }`}>
            {isCancelled ? (
              <>
                <li className="flex gap-2">
                  <span className={isCancelled ? "text-blue-600" : "text-gray-600"}>•</span>
                  <span>
                    Your booking was cancelled on {new Date(currentBooking.updated_at || currentBooking.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </li>
                {currentBooking.payment_status === "refunded" && (
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      Refund processed - please allow 5-10 business days for it to appear in your account
                    </span>
                  </li>
                )}
                <li className="flex gap-2">
                  <span className={isCancelled ? "text-blue-600" : "text-gray-600"}>•</span>
                  <span>
                    You're welcome to make a new booking anytime
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-2">
                  <span className="text-gray-600">•</span>
                  <span>
                    The booking could not be completed due to payment issues
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-600">•</span>
                  <span>
                    No charges were applied to your payment method
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-600">•</span>
                  <span>
                    Please try booking again or contact support if you need assistance
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
