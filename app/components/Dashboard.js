"use client"; // Indica que este componente deve ser renderizado no cliente


import { useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const [name, setName] = useState(""); // Estado para o nome do produto
    const [price, setPrice] = useState(""); // Estado para o preço do produto

    // Função para buscar os produtos (GET)
    async function fetchProducts() {
        const res = await fetch('http://localhost:3000/api/products');
        const data = await res.json();
        setProducts(data);
    }

    // Chamada inicial para buscar os produtos
    useState(() => {
        fetchProducts();
    }, []);

    // Função para adicionar um produto (POST)
    async function handleAddProduct() {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        });

        if (response.ok) {
            alert("Produto adicionado com sucesso!");
            setName(""); // Limpa o campo do nome
            setPrice(""); // Limpa o campo do preço
            fetchProducts(); // Atualiza a lista de produtos
        } else {
            alert("Erro ao adicionar o produto.");
        }
    }

    return (
        <div>
            <h1>Lista de Produtos registrados no banco de dados</h1>

            {/* Formulário para adicionar um produto */}
            <div>
                <input
                    placeholder="Nome do produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome
                />
                <input
                    placeholder="Preço do produto"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} // Atualiza o estado do preço
                />
                <button onClick={handleAddProduct}>Adicionar Produto</button>
            </div>

            {/* Lista de produtos */}
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
