import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { LoaderCircle } from "lucide-react";

function Loading() {

    useGSAP(() => {
        gsap.to("#loading-text", {
            rotationX: 360
        })
    })
    return (
        <main className="flex items-center justify-center min-h-screen ">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <LoaderCircle className="animate-spin text-green-500 mb-10" size={100} />
                <h1 id="loading-text" className="text-2xl font-bold text-gray-800">SUNRISE-STAY HOTEL</h1>
            </div>
        </main>
    );
}

export default Loading;