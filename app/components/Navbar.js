import Link from "next/link";

/*  "const Navbar = () => {}" é uma função. Especificamente, 
    é uma função anônima (sem nome) armazenada na variável Navbar. 
    Essa função é chamada de arrow function devido à sintaxe () => {} 
*/

const Navbar = () => { 
    return (
  <nav className="
  flex  py-2 px-7 w-full
  bg-[#33687b] text-black text-align text-center"
  >        
    <ul className="flex justify-between w-full ">
      <li>
        <h1 className="font-semibold">Marcondes Barbearia</h1> 
      </li> 
    </ul>
  </nav>
  );
};

export default Navbar;