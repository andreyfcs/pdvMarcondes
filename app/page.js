'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import PDV from "./components/PDV";

//import Products from "./api/Products";

export default function Home() {
  return (    
    <div> 
  <Navbar />
  <PDV />
    </div>

); 
}
