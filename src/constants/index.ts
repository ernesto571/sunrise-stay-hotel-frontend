import { KeyRound, Car, Wifi, ConciergeBell, Utensils, Waves, } from "lucide-react";

export const sidebarLinks = [
  { path: "/", label: "Home" },
  { path: "/rooms", label: "Rooms" },
  { path: "/services", label: "Services" },
  { path: "/contact-us", label: "Contact Us" },
  { path: "/my-bookings", label: "My Bookings" },
];

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/rooms", label: "Rooms" },
  { path: "/services", label: "Services" },
  { path: "/contact-us", label: "Contact Us" },
];


export const overview = [
    {
        id:1,
        content:"Experience refined luxury in a serene setting where elegant design, modern comfort, and thoughtful service come together effortlessly."
    },
    {
        id:2,
        content:"Discover a sophisticated retreat crafted for relaxation, featuring premium amenities, timeless interiors, and attentive hospitality at every moment."
    },
    {
        id:3,
        content:"Enjoy an elevated stay defined by comfort and style, with carefully curated spaces and personalized service designed to exceed expectations."
    },
    {
        id:4,
        content:"Unwind in a tranquil atmosphere where world-class facilities, tasteful architecture, and warm professional care create a truly memorable escape."
    },
    {
        id:5,
        content:"Step into a refined haven that blends contemporary elegance with exceptional comfort, delivering a seamless and indulgent guest experience."
    },
]

export const facilities = [
    {
        id:1,
        icon: KeyRound,
        name: "Smart Key"
    },
    {
        id:2,
        icon: Car,
        name: "Free Car Parking"
    },
    {
        id:3,
        icon: Wifi,
        name: "Fast Wifi Internet"
    },
    {
        id:4,
        icon: ConciergeBell,
        name: "Room Service"
    },
    {
        id:5,
        icon: Utensils,
        name: "Food & Drink"
    },
    {
        id:6,
        icon: Waves,
        name: "Swimming Pool"
    },
]

export const services = [
    {
      id: 1,
      type: "Leisure",
      title: "Family Fun Package",
      img: "/services/family.jpg",
      description: "A perfect getaway designed for families to relax, bond, and enjoy premium hospitality together.",
      includes: [
        "Complimentary theme park tickets",
        "Free meals for kids under 12",
        "Spacious family room",
        "Late checkout option"
      ],
      price: 180,
      oldPrice: 240
    },
    {
      id: 2,
      type: "Relaxation",
      title: "Spa & Beauty Retreat",
      img: "/services/spa.jpg",
      description: "Rejuvenate your body and mind with luxury spa treatments in a calm and serene environment.",
      includes: [
        "Full body massage",
        "Facial and skincare session",
        "Access to sauna and steam room",
        "Complimentary herbal drinks"
      ],
      price: 150,
      oldPrice: 210
    },
    {
      id: 3,
      type: "Couples",
      title: "Romantic Getaway",
      img: "/services/romantic.jpg",
      description: "An intimate escape curated for couples seeking privacy, comfort, and unforgettable moments.",
      includes: [
        "Candlelight dinner for two",
        "Decorated luxury suite",
        "Complimentary wine",
        "Late checkout"
      ],
      price: 220,
      oldPrice: 300
    },
    {
      id: 4,
      type: "Executive",
      title: "Business & Executive Package",
      img: "/services/business.avif",
      description: "Designed for professionals who value efficiency, comfort, and seamless business services.",
      includes: [
        "High-speed internet access",
        "Complimentary breakfast",
        "Meeting room access",
        "Airport pickup and drop-off"
      ],
      price: 200,
      oldPrice: 260
    },
    {
      id: 5,
      type: "Fitness",
      title: "Wellness & Fitness Stay",
      img: "/services/gym.webp",
      description: "Maintain a healthy routine while enjoying a peaceful stay with premium wellness facilities.",
      includes: [
        "Daily gym access",
        "Yoga or fitness session",
        "Healthy meal plan",
        "Swimming pool access"
      ],
      price: 170,
      oldPrice: 230
    }
];