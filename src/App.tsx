import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import HomePage from "./pages/home";
import AuthListener from "./hooks/AuthListener";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Loading from "./components/Loading";
import RoomDetails from "./pages/RoomDetails";
import RoomPage from "./pages/RoomPage";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import PaymentPage from "./pages/PaymentPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookingFailedPage from "./pages/BookingFailedPage";


function App() {
  const {  isLoaded: clerkLoaded } = useUser();

  if (!clerkLoaded) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <AuthListener/>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/contact-us" element={<ContactPage/>} />
          <Route path="/rooms" element={<RoomPage/>} />
          <Route path="/services" element={<ServicePage/>} />
          <Route path="/my-bookings" element={<MyBookingsPage/>} />
          <Route path="/rooms/:RoomName" element={<RoomDetails/>} />

          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/booking-success/:bookingId" element={<BookingSuccessPage/>} />
          <Route path="/booking-failed/:bookingId" element={<BookingFailedPage/>} />

          <Route path="/sign-in/*" element={<SignInPage/>} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
        </Routes>

        <Toaster
          position="bottom-center"
          toastOptions={{
            // Default options for all toasts
            duration: 4000,
            style: {
              background: '#1f2937', // dark gray background
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
              fontSize: '14px',
            },
            
            // Success toast styling
            success: {
              style: {
                background: '#059669', // emerald-600
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#059669',
              },
            },
            
            // Error toast styling
            error: {
              style: {
                background: '#dc2626', // red-600
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#dc2626',
              },
            },
            
            // Custom icon (your logo)
            icon:  <img src="/logo_01.png" alt="logo" className="w-6 h-6" />,
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
