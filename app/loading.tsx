'use client'
import PulseLoader from "react-spinners/PulseLoader";

export default function Loading() {
    
    return (
    <div className="flex align-items-center justify-content-center h-screen">
         <PulseLoader color="#d63636" size={15} aria-label = "Carregando Spinner" margin={2} />
    </div>
    )
  }