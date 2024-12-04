import Link from "next/link";

/*  "const Navbar = () => {}" é uma função. Especificamente, 
    é uma função anônima (sem nome) armazenada na variável Navbar. 
    Essa função é chamada de arrow function devido à sintaxe () => {} 
*/

const Navbar = () => { 
    return (
  <nav className="
  flex  py-2 px-7 w-full
  bg-neutral-400 text-black text-align text-center"
  >        
    <ul className="flex justify-between w-full ">
      <li>
        <h1 className="font-semibold">Marcondes Barbearia</h1> 
      </li> 
    </ul>
      <div>
        <ul className="flex justify-between w-full ">     
          <li>
            <Link href="">
            Painel
            </Link>
          </li> 
          <li>
            <Link href="">
            Caixa
            
            </Link>
          </li>
         </ul>
        </div>
    </nav>
  );
};

export default Navbar;