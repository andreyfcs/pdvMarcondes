import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { PDVController } from './PDVController';
import React, { useState } from "react";

const PDVView = () => {
  const {
    buttons,
    activeButton,
    toggleButton,
    inputValue,
    setInputValue,
    handleConfirm,
    products,
    cart,
    total,
    addToCart,
    registerSale,
    removeFromCart,
    discount,
    applyDiscount,
    totalWithDiscount,
  } = PDVController();
  //testar array do CArrinho
  
  const capturarIds = () => {
    const ids = cart.map((item) => item.id);
    console.log(ids)
  };

  console.log(capturarIds())

  console.log(`este é o array: ${JSON.stringify(cart)}`)

  const [discountInput, setDiscountInput] = useState("");
 
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
                      <td><button
                      onClick={() => removeFromCart(item.id)}
                      ><RiSubtractFill /></button></td>
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
          <h3 className="mt-5 text-[40px]">Total com desconto: R${totalWithDiscount().toFixed(2)}</h3>
          <button
            onClick={registerSale}
            className="
            bg-[#1b303b] text-white py-2 px-4 rounded mt-1 w-full lg:w-auto 
            inline-flex items-center space-x-2"
          >
            Registrar
          </button>          
          
          {/* Botão de Desconto */}
          <div className="mt-4">
          <input
          type="number"
          value={discountInput}
          onChange={(e) => setDiscountInput(e.target.value)}
          placeholder="Valor do desconto"
          className="border p-2 rounded w-full max-w-xs"
          />
          <button
            onClick={() => applyDiscount(discountInput)}
            className="
            bg-[#1b303b] text-white py-2 px-4 rounded mt-1 w-full lg:w-auto 
            inline-flex items-center space-x-2"
            >
            Aplicar Desconto
          </button>
        </div>
        
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
              <span className="text-gray-600 ml-2">Estoque: {product.stock}</span>
              <button
                onClick={() => addToCart(product)}
                className=""
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDVView;
