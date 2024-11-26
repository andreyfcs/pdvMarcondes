'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PDV from "./components/Carrinho"
//import Products from "./api/Products";

export default function Home() {
  return (    
    <div> 
  <Navbar />
  
 <PDV />
    </div>

); 
}
