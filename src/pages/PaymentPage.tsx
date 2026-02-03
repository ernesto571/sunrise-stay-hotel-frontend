import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/BookingStore";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircle2, Lock, CreditCard, Calendar, Users, ArrowLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Footer from "../components/Footer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Card Element styling
const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true, 
  style: {
    base: {
      fontSize: "16px",
      color: "#1c1c1c",
      fontFamily: "'Inter', -apple-system, sans-serif",
      "::placeholder": {
        color: "#94a3b8",
      },
      iconColor: "#76be81",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
};

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { currentBooking, clientSecret, confirmBooking, loading, error } = useBookingStore();

  useGSAP(() => {
    // Only run animation when loading is complete
    if (!loading) {
      const tilteSplit = new SplitText("#payment-title", { type: 'chars, words' })
      const subtitleSplit = new SplitText("#payment-subtitle", { type: 'lines' })
  
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
  
      gsap.from('#payment-content', {
        opacity:0,
        duration: 0.5,
        ease: "expo.out",
        delay:1.7
      })
  
    }
  }, [loading])

  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    // Redirect if no booking exists
    if (!currentBooking || !clientSecret) {
      console.log("No booking or client secret, redirecting to rooms");
      navigate("/rooms");
    }
  }, [currentBooking, clientSecret, navigate]);

  // Early return if no booking
  if (!currentBooking) {
    return null;
  }

  // Safely get the total price as a number
  const getTotalPrice = () => {
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
    
  };

  const totalPrice = getTotalPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret!, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });

      if (stripeError) {
        setPaymentError(stripeError.message || "Payment failed");
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Confirm booking in backend
        await confirmBooking(paymentIntent.id);

        // Redirect to success page
        navigate(`/booking-success/${currentBooking.id}`);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setPaymentError(err.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
       <div className="relative w-full h-[320px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/room-details-img.jpg"
          className="w-full h-full object-cover"
          alt="Rooms"
        />
        <div className="grid absolute inset-0 items-center justify-center text-center font-serif tracking-wider text-white">
          <div>
            <div className="text-center ">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
                <Lock size={16} />
                <span className="text-sm font-semibold">Secure Payment</span>
              </div>
              <h1 id="payment-title" className="text-4xl md:text-5xl font-serif font-light white mb-3">
                Complete Your Reservation
              </h1>
              <p id="payment-subtitle" className="text-white text-[0.9rem] md:text-lg">
                You're just one step away from your perfect stay
              </p>
            </div>

          </div>
        </div>
      </div>
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div id="payment-content" className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Booking Summary */}
          <div className="space-y-6">
            {/* Booking Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">
                Booking Summary
              </h2>

              <div className="space-y-4">
                {/* Room info */}
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Room</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentBooking.room_number || "N/A"}
                  </p>
                </div>

                {/* Dates */}
                <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                  <Calendar className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Check-in</p>
                    <p className="font-semibold text-gray-900">
                      {currentBooking.check_in ? new Date(currentBooking.check_in).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }) : "N/A"}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Check-out</p>
                    <p className="font-semibold text-gray-900">
                      {currentBooking.check_out ? new Date(currentBooking.check_out).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }) : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <Users className="text-emerald-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Guests</p>
                    <p className="font-semibold text-gray-900">
                      {currentBooking.adults || 0} {(currentBooking.adults || 0) === 1 ? "Adult" : "Adults"}
                      {(currentBooking.children || 0) > 0 &&
                        `, ${currentBooking.children} ${
                          currentBooking.children === 1 ? "Child" : "Children"
                        }`}
                    </p>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & fees</span>
                    <span>Included</span>
                  </div>
                  <div className="pt-3 border-t-2 border-gray-900 flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">Total</span>
                    <span className="text-[1.6rem] md:text-3xl font-bold text-emerald-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex gap-3">
                <CheckCircle2
                  size={24}
                  className="text-blue-600 flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">
                    Free Cancellation
                  </p>
                  <p className="text-sm text-blue-700">
                    Cancel up to 24 hours before check-in for a full refund
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <CreditCard className="text-emerald-700" size={24} />
                </div>
                <h2 className="text-2xl font-serif font-light text-gray-900">
                  Payment Details
                </h2>
              </div>

              {/* Card Element */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Card Information *
                </label>
                <div className="border-2 border-gray-200 rounded-xl p-4 focus-within:border-emerald-500 transition-colors">
                  <CardElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => setCardComplete(e.complete)}
                  />
                </div>
              </div>

              {/* Error messages */}
              {(paymentError || error) && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium">
                    {paymentError || error}
                  </p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={!stripe || processing || !cardComplete || loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
              >
                {processing || loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${totalPrice.toFixed(2)}`
                )}
              </button>

              {/* Security note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock size={16} />
                <span>Secured by Stripe • 256-bit SSL encryption</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Main Payment Page Component
export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}