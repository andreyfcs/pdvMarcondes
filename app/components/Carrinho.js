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
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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
    <div>
      <h1>PDV - Frente de Caixa</h1>
      
      <div className=
      "w-72 h-72 border-2 border-gray-400 overflow-y-auto p-4 mt-4"
      >
        <h2>Carrinho</h2>
        {cart.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
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
                {cart.map((item) => (
                  <tr key={item.id}>
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
        <h3>Total: R${total.toFixed(2)}</h3>
        <button onClick={registerSale} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
          Registrar Venda
        </button>
      </div>

      <h2>Produtos Disponíveis</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} className="mb-4">
            <p>{product.name} - R${Number(product.price).toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 text-white py-1 px-3 rounded"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDV;
