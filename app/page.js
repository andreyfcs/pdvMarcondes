import Image from "next/image";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
//import Products from "./api/Products";

export default function Home() {
  return (    
    <div> 
  <Navbar />
 <Dashboard /> 
    </div>

); 
}
