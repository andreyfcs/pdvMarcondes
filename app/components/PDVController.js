import { useState, useEffect } from 'react';

export const PDVController = () => {
  const [products, setProducts] = useState([]); // Lista de produtos do banco
  const [cart, setCart] = useState([]); // Carrinho do cliente
  const [total, setTotal] = useState(0); // Total da compra
  const [activeButton, setActiveButton] = useState(null); // Estado do botão ativo
  const [inputValue, setInputValue] = useState(''); // Estado do input
  const [discount, setDiscount] = useState(0); // Estado para armazenar o desconto

  //função desconto
  const applyDiscount = (value) => {
    const discountValue = parseFloat(value); //converte o valor para numero
    if (!isNaN(discountValue) && discountValue > 0) {
      setDiscount(discountValue);
    } else {
      alert("Valor invalido para desconto");
    }
  };

  // calcula o total com desconto
  const totalWithDiscount = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal - discount;
  };

 
  //botões dinamicos
  const buttons = [
    { 
      id: 3, 
      label: 'Estoque',
      subButtons: [
        { id: 3.1, label: 'Adicionar ao Estoque' },
        { id: 3.2, label: 'Ver Estoque' }
      ]
    },
    { id: 4, label: 'Registros' },
   
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

  // Captura os Id's de cada item no carrinho 
  const capturarIds = () => {
    const ids = cart.map((item) => item.name);
    console.log(ids)
    return ids
  };
 


  // Remover item do carrinho
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart]; // Cria uma cópia do carrinho
  
      // Encontra o primeiro item com o ID correspondente
      const index = updatedCart.findIndex((item) => item.id === productId);
  
      if (index !== -1) { // Se o item foi encontrado
        if (updatedCart[index].quantity > 1) {
          // Reduz a quantidade se for maior que 1
          updatedCart[index].quantity -= 1;
        } else {
          // Remove o item se a quantidade for 1
          updatedCart.splice(index, 1);
        }
      }
  
      return updatedCart; // Atualiza o estado do carrinho
    });
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

  return {
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
  };
};
