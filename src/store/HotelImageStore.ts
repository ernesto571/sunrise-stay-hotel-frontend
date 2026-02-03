import {create} from "zustand"
import axios from "../lib/axios";

interface Images {
    id: string;
    image_url: string;
}

interface HotelImages {
    images : Images[];
    loading : boolean;
    fetchHotelImages: ()=> Promise<void>;
}

export const useHotelImageStore = create<HotelImages>((set) => ({
    images : [],
    loading : false,
    fetchHotelImages: async () => {
        console.log("fetchHotelImages: Starting request...");
        
        try {
            set({loading : true });
            const res = await axios.get("/hotel-images");
            console.log("fetchHotelImages: Response received", res.data);

            set({
                images: res.data.data,
                loading : false
            })
        } catch (error) {
            console.error("fetchHotelImages: Error occurred", error);
            set({ loading: false });
        }
    },
}))