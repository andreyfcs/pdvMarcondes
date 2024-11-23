// app/products/page.js
export default async function Products() {
    // Faz a requisição para a API
    const res = await fetch('http://localhost:3001/api/products');
    
    // Converte a resposta para JSON
    const products = await res.json();
  
    return (
      <div className="text-center bg-gray-200 border border-2 border-rose-300">
        <h1>Lista de Produtos registrados no banco de dados</h1>
        <input />
        <button div className="border-rose-300 border-2">Enviar</button>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  