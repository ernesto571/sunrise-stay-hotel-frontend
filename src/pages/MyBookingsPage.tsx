import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/BookingStore";
import { Calendar, Users, MapPin, Eye, X, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Footer from "../components/Footer";

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { bookings, fetchUserBookings, cancelBooking, loading } = useBookingStore();
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">("all");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  useGSAP(() => {
    // Only run animation when loading is complete
    if (!loading) {
      const tilteSplit = new SplitText("#bookings-title", { type: 'chars, words' })
      const subtitleSplit = new SplitText("#bookings-subtitle", { type: 'lines' })
  
      gsap.from(tilteSplit.chars, {
        opacity:0,
        yPercent: 50,
        delay: 0.2,
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
  
      gsap.from('#bookings-content', {
        opacity:0,
        duration: 0.5,
        ease: "expo.out",
        delay:1.7
      })
  
    }
  }, [loading])
  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // Safe price conversion
  const getPrice = (price: any) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const parsed = parseFloat(price);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  // Handle cancel booking
  const handleCancelClick = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!bookingToCancel) return;

    try {
      await cancelBooking(bookingToCancel);
      toast.success("Booking cancelled successfully!");
      setShowCancelModal(false);
      setBookingToCancel(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-emerald-100 text-emerald-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
      failed: "bg-gray-100 text-gray-700",
    };

    const icons = {
      confirmed: <CheckCircle size={16} />,
      pending: <Clock size={16} />,
      cancelled: <XCircle size={16} />,
      failed: <AlertCircle size={16} />,
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${styles[status as keyof typeof styles] || styles.pending}`}>
        {icons[status as keyof typeof icons] || icons.pending}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Check if booking can be cancelled
  const canCancelBooking = (booking: any) => {
    if (booking.status === "cancelled" || booking.status === "completed") {
      return false;
    }

    const checkInDate = new Date(booking.check_in);
    const now = new Date();
    const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    return hoursUntilCheckIn > 24;
  };

  if (loading && bookings.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative w-full h-[320px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/room-details-img.jpg"
          className="w-full h-full object-cover"
          alt="My Bookings"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 id="bookings-title" className="text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] font-serif text-white tracking-wider">
              My Bookings
            </h1>
            <p id="bookings-subtitle" className="text-white/90 md:text-xl mt-3">
              Manage all your reservations in one place
            </p>
          </div>
        </div>
      </div>

      <div id="bookings-content" className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === "all"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === "confirmed"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Confirmed ({bookings.filter((b) => b.status === "confirmed").length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === "pending"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Pending ({bookings.filter((b) => b.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              filter === "cancelled"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancelled ({bookings.filter((b) => b.status === "cancelled").length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md py-12 px-6  md:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "all"
                  ? "You haven't made any bookings yet. Start exploring our rooms!"
                  : `You don't have any ${filter} bookings.`}
              </p>
              <button
                onClick={() => navigate("/rooms")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Browse Rooms
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                      <p className="text-xl font-bold text-gray-900 font-mono">
                        #{booking.id.toString().slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Check-in/out */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Check-in</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.check_in).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Check-out</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(booking.check_out).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Room & Guests */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Room</p>
                          <p className="font-semibold text-gray-900">
                            Room {booking.room_number}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Guests</p>
                          <p className="font-semibold text-gray-900">
                            {booking.adults || 0} {(booking.adults || 0) === 1 ? "Adult" : "Adults"}
                            {(booking.children || 0) > 0 && `, ${booking.children} Child${booking.children > 1 ? "ren" : ""}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Price</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          ${getPrice(booking.total_price).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Payment: {(booking.payment_status || "unpaid").toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                    {/* View Details Button - Conditional Navigation */}
                    {booking.status === "pending" ? (
                      <button
                        onClick={() => navigate('/payment')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                        Complete Payment
                      </button>
                    ) : booking.status === "cancelled" ? (
                      <button
                        onClick={() => navigate(`/booking-failed/${booking.id}`)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/booking-success/${booking.id}`)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                    )}

                    {canCancelBooking(booking) && (
                      <button
                        onClick={() => handleCancelClick(booking.id)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors"
                      >
                        <X size={18} />
                        Cancel Booking
                      </button>
                    )}

                    {!canCancelBooking(booking) && booking.status !== "cancelled" && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg">
                        <AlertCircle size={16} />
                        Cannot cancel (within 24 hours of check-in)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Cancel Booking?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to cancel this booking? This action cannot be undone, but you will receive a full refund.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setBookingToCancel(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}