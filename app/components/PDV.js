import { useState, useEffect } from 'react';

const PDV = () => {
  const [products, setProducts] = useState([]); // Lista de produtos do banco
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
<div className="flex flex-wrap justify-between">
  {/* Div dos Produtos Disponíveis */}
  <div className="w-full lg:w-[48%]">
    <h2 className="text-center mt-2">Produtos Disponíveis</h2>
    <div className="h-72 border-2 border-gray-400 overflow-y-auto p-4 mt-4 ml-4">  
      {products.map((product) => (
        <div key={product.id} className="mb-4 flex justify-between items-start gap-4">
          <p>{product.name} - R${Number(product.price).toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-slate-500 text-white py-1 px-3 rounded">
            Adicionar
          </button>
        </div> 
      ))}
    </div>
  </div>
  {/* Div do Carrinho */}
  <div className="w-full lg:w-[48%]"> 
  <h2 className="text-center mt-2">Carrinho</h2>
    <div className="h-72 border-2 border-gray-400 overflow-y-auto p-4 mt-4 mr-5">
      {cart.length > 0 ? (
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={`${item.id}-${index}`}> 
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>R${Number(item.price).toFixed(2)}</td>
                  <td>R${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
    <h3 className="mt-5">Total: R${total.toFixed(2)}</h3>
    <button
      onClick={registerSale}
      className="bg-blue-950 text-white py-2 px-4 rounded mt-1">
      Registrar Venda
    </button>
  </div>
</div>

  );
};

export default PDV;
