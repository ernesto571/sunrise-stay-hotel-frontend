import { useState, useEffect } from "react";
import { Send, Clock, Mail, User, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Load cooldown from localStorage on mount
  useEffect(() => {
    const storedEndTime = localStorage.getItem("contactFormCooldown");
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime);
      const now = Date.now();
      
      if (endTime > now) {
        setCooldownEndTime(endTime);
      } else {
        // Cooldown expired, clear it
        localStorage.removeItem("contactFormCooldown");
      }
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!cooldownEndTime) {
      setTimeRemaining(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, cooldownEndTime - now);
      
      if (remaining === 0) {
        setCooldownEndTime(null);
        localStorage.removeItem("contactFormCooldown");
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remaining);
      }
    };

    // Update immediately
    updateTimer();

    // Then update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [cooldownEndTime]);

  // Format time remaining
  const formatTimeRemaining = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if still in cooldown
    if (cooldownEndTime && Date.now() < cooldownEndTime) {
      toast.error("Please wait before sending another message");
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Replace with your actual API call
      // const response = await axios.post("/api/contact", formData);

      // Set 20-minute cooldown (20 * 60 * 1000 milliseconds)
      const cooldownDuration = 20 * 60 * 1000;
      const endTime = Date.now() + cooldownDuration;
      
      setCooldownEndTime(endTime);
      localStorage.setItem("contactFormCooldown", endTime.toString());

      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || (cooldownEndTime !== null && Date.now() < cooldownEndTime);

  return (
    <form onSubmit={handleSubmit} className="space-y-6  p-5 md:p-10">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isDisabled}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="text-gray-400" size={20} />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isDisabled}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Message *
        </label>
        <div className="relative">
          <div className="absolute top-3 left-0 pl-4 pointer-events-none">
            <MessageSquare className="text-gray-400" size={20} />
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isDisabled}
            rows={5}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Tell us how we can help you..."
            required
          />
        </div>
      </div>

      {/* Cooldown Timer Display */}
      {cooldownEndTime && timeRemaining > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="font-semibold text-yellow-900">
                Please wait before sending another message
              </p>
              <p className="text-sm text-yellow-700">
                Time remaining: <span className="font-mono font-bold">{formatTimeRemaining(timeRemaining)}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isDisabled}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 shadow-lg shadow-emerald-200 disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
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
            Sending...
          </>
        ) : cooldownEndTime && timeRemaining > 0 ? (
          <>
            <Clock size={20} />
            Wait {formatTimeRemaining(timeRemaining)}
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </button>

      {/* Helper text */}
      <p className="text-sm text-gray-500 text-center">
        * All fields are required. We typically respond within 24 hours.
      </p>
    </form>
  );
}