import Link from "next/link";

/*  "const Navbar = () => {}" é uma função. Especificamente, 
    é uma função anônima (sem nome) armazenada na variável Navbar. 
    Essa função é chamada de arrow function devido à sintaxe () => {} 
*/

const Navbar = () => { 
    return (
<div className="bg-neutral-200 border-2 border-rose-300  text-black text-align text-center">
<h1>Barbearia</h1> 
</div>
);
};
export default Navbar;