import { create } from "zustand";
import axios from "../lib/axios";

interface BookingData {
  room_type_name: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
}

interface Booking {
  id: string;
  user_id: number;
  room_number: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "failed";
  payment_status: "unpaid" | "paid" | "refunded";
  payment_intent_id: string;
  created_at: string;
  updated_at: string;
}

interface BookingStore {
  bookings: Booking[];
  currentBooking: Booking | null;
  clientSecret: string | null;
  loading: boolean;
  error: string | null;

  // Create booking and get payment intent
  createBooking: (bookingData: BookingData) => Promise<void>;

  // Confirm booking after payment
  confirmBooking: (paymentIntentId: string) => Promise<void>;

  // Fetch user's bookings
  fetchUserBookings: () => Promise<void>;

  // Fetch single booking by ID
  fetchBookingById: (bookingId: string) => Promise<void>;

  // Cancel booking
  cancelBooking: (bookingId: string) => Promise<void>;

  // Reset state
  resetBooking: () => void;

  // Clear error
  clearError: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  currentBooking: null,
  clientSecret: null,
  loading: false,
  error: null,

  createBooking: async (bookingData: BookingData) => {
    console.log("createBooking: Starting request...", bookingData);

    try {
      set({ loading: true, error: null });

      const res = await axios.post("/bookings/create", bookingData);

      console.log("createBooking: Response received", res.data);

      set({
        currentBooking: res.data.booking,
        clientSecret: res.data.clientSecret,
        loading: false,
      });
    } catch (error: any) {
      console.error("createBooking: Error occurred", error);

      const errorMessage =
        error.response?.data?.message || "Booking failed. Please log in to continue.";

      set({
        error: errorMessage,
        loading: false,
      });

      throw error; // Re-throw for component handling
    }
  },

  confirmBooking: async (paymentIntentId: string) => {
    console.log("confirmBooking: Starting request...", paymentIntentId);

    try {
      set({ loading: true, error: null });

      const res = await axios.post("/bookings/confirm", {
        payment_intent_id: paymentIntentId,
      });

      console.log("confirmBooking: Response received", res.data);

      set({
        currentBooking: res.data.booking,
        loading: false,
      });

      // Optionally refresh bookings list
      get().fetchUserBookings();
    } catch (error: any) {
      console.error("confirmBooking: Error occurred", error);

      const errorMessage =
        error.response?.data?.message || "Failed to confirm booking";

      set({
        error: errorMessage,
        loading: false,
      });

      throw error;
    }
  },

  fetchUserBookings: async () => {
    console.log("fetchUserBookings: Starting request...");

    try {
      set({ loading: true, error: null });

      const res = await axios.get("/bookings/my-bookings");

      console.log("fetchUserBookings: Response received", res.data);

      set({
        bookings: res.data.bookings || res.data.data || [],
        loading: false,
      });
    } catch (error: any) {
      console.error("fetchUserBookings: Error occurred", error);

      const errorMessage =
        error.response?.data?.message || "Failed to fetch bookings";

      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  fetchBookingById: async (bookingId: string) => {
    console.log("fetchBookingById: Starting request...", bookingId);

    try {
      set({ loading: true, error: null });

      const res = await axios.get(`/bookings/${bookingId}`);

      console.log("fetchBookingById: Response received", res.data);

      set({
        currentBooking: res.data.booking || res.data.data,
        loading: false,
      });
    } catch (error: any) {
      console.error("fetchBookingById: Error occurred", error);

      const errorMessage =
        error.response?.data?.message || "Failed to fetch booking";

      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  cancelBooking: async (bookingId: string) => {
    console.log("cancelBooking: Starting request...", bookingId);

    try {
      set({ loading: true, error: null });

      const res = await axios.post(`/bookings/${bookingId}/cancel`);

      console.log("cancelBooking: Response received", res.data);

      // Update local state
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" as const }
            : booking
        ),
        currentBooking:
          state.currentBooking?.id === bookingId
            ? { ...state.currentBooking, status: "cancelled" as const }
            : state.currentBooking,
        loading: false,
      }));
    } catch (error: any) {
      console.error("cancelBooking: Error occurred", error);

      const errorMessage =
        error.response?.data?.message || "Failed to cancel booking";

      set({
        error: errorMessage,
        loading: false,
      });

      throw error;
    }
  },

  resetBooking: () => {
    set({
      currentBooking: null,
      clientSecret: null,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));