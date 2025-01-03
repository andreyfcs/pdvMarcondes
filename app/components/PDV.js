import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";  

const PDV = () => {
  const [products, setProducts] = useState([]); // Lista de produtos do banco
  const [cart, setCart] = useState([]); // Carrinho do cliente
  const [total, setTotal] = useState(0); // Total da compra
  const [activeButton, setActiveButton] = useState(null); // Estado do botão ativo
  const [inputValue, setInputValue] = useState(''); // Estado do input

  // Lista de botões com rótulos
  const buttons = [
    { 
      id: 1, 
      label: 'Pesquisar', 
      subButtons: [
        { id: 1, label: 'Pesquisar' }, 
        
      ]
    },
 /*   { 
      id: 2, 
      label: 'Remover', 
      subButtons: [
        { id: 2, label: 'Remover', label: 'Quantidade' }, 
      ]
    },*/
    { 
      id: 3, 
      label: 'Estoque',
      subButtons: [
        { id: 3.1, label: 'Adicionar ao Estoque' },
        { id: 3.2, label: 'Ver Estoque' }
      ]
    },
    { id: 4, label: 'Registros' },
    { id: 5, label: 'Desconto' }
  ];
  

  // Alterna o estado do botão ativo
  const toggleButton = (id) => {
    setActiveButton(activeButton === id ? null : id); // Desativa se já estiver ativo
  };

  // Função para lidar com a confirmação
  const handleConfirm = () => {
    alert(`Botão: ${buttons.find((b) => b.id === activeButton).label}, Valor: ${inputValue}`);
    setInputValue(''); // Limpa o input após confirmar
  };

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
    <div className="bg-[#8aaaaa] flex flex-wrap justify-center space-y-4 lg:space-y-0 h-screen border-2 border-blue-600">
      
      {/* Div do Carrinho */}
      <div className="w-full lg:w-[48%]">
        <div className="h-72 border-2 border-[#1b303b] overflow-y-auto p-4 mt-4 lg:mr-5">
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
          
          {/* Total + Registrar Venda */} 
      </div>
         <h3 className="mt-5 text-[40px]">Total: R${total.toFixed(2)}</h3>
          <button onClick={registerSale} className="
          bg-[#1b303b] text-white py-2 px-4 rounded mt-1 w-full lg:w-auto
          inline-flex items-center space-x-2">
          Registrar Venda
          </button>
      </div>

      {/* Div dos Produtos Disponíveis */}
      <div className="w-full lg:w-[48%] border-2 space-x-4 ml-0 mt-1">
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {buttons.map((button) => (
              
              <button
                key={button.id}
                onClick={() => toggleButton(button.id)}
                className={`py-2 px-4 rounded ${
                  activeButton === button.id
                    ? 'bg-green-500 text-white'
                    : 'bg-[#3b585e] text-white'
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Input condicional exibido apenas se algum botão estiver ativo */}
          {activeButton && (
            <div className="mt-4 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Digite para ${buttons.find((b) => b.id === activeButton).label}`}
                className="border p-2 rounded w-full max-w-xs"
              />
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Confirmar
              </button>
            </div>
          )}
        </div>



        {/* Container de Produtos */}
        <div className="h-72 border-2 border-[#1b303b] overflow-y-auto p-4 mt-4 ml-0">
          {products.map((product) => (
            <div key={product.id} className="mb-4 flex justify-between items-start gap-4">
              <p>{product.name} - R${Number(product.price).toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="">
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDV;
