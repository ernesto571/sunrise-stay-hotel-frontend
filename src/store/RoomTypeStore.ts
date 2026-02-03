import {create} from "zustand"
import axios from "../lib/axios";

interface RoomTypes {
    id: number;
    name: string;
    tagline: string;
    description: string;
    max_adults: number;
    max_children: number;
    size_sqm: number;
    price_per_night: number;
    image: string;
    features: string[];
    amenities: string[];
    inclusions: string[]
    house_rules: string;
    check_in_time: string;
    check_out_time: string;
}

interface HotelRoomTypes {
    roomTypes : RoomTypes[];
    loading : boolean;
    fetchRoomTypes: () => Promise<void>;
}

export const useRoomTypeStore = create<HotelRoomTypes>((set) => ({
    roomTypes : [],
    loading : false,
    fetchRoomTypes : async() => {
        console.log('fetchroomtypes: starting request...')
        
        try {
            set({ loading : true});
            const res = await axios.get("/room-types");
            console.log("fetchRoomTypes: Response received", res.data)

            set({
                roomTypes: res.data.data,
                loading: false
            })
        } catch (error) {
            console.error("fetchRoomTypes: Error occurred", error);
            set({ loading: false }); 
        }
    }
}))