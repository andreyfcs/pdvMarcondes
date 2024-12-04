'use client'
import Link from "next/link";
import { useState, useEffect } from 'react';




const Sidebar = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // Carrinho do cliente
    const [total, setTotal] = useState(0); // Total da compra

 // Carrega os produtos disponíveis ao iniciar a venda
 useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  // Atualiza o total sempre que o carrinho mudar
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotal(newTotal);
  }, [cart]);
   
  // Adiciona um produto ao carrinho 
  const addToCart = (product) => {

      setCart([...cart, { ...product, quantity: 1 }]);

  };

  // Registra a venda (envia para a API `sales`)
  const registerSale = () => {
    fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Venda registrada com sucesso!');
        setCart([]); // Limpa o carrinho após registrar
      })
      .catch((err) => console.error('Erro ao registrar venda:', err));
  };
    
    return (
        
        
        <aside className="
       "
        >
              <h2 className="text-center">Produtos Disponíveis</h2>
      <div className="flex justify-between p-2">
        {products.map((product) => (
          <div key={product.id} className="mb-4">
            <p>{product.name} - R${Number(product.price).toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-slate-500 text-white py-1 px-3 rounded"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
      
        </aside>
    );
}


export default Sidebar;










/*

      <h2 className="text-center">Produtos Disponíveis</h2>
      <div className="flex justify-between p-2">
        {products.map((product) => (
          <div key={product.id} className="mb-4">
            <p>{product.name} - R${Number(product.price).toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-slate-500 text-white py-1 px-3 rounded"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      */