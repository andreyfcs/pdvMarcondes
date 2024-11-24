// app/api/products/route.js
import { NextResponse } from 'next/server';
import db from '../../lib/db';  // Verifique o caminho correto


export async function GET(req) {
  try {
    // Consulta a tablea products no banco de dados "marcondes"
    const [products] = await db.query('SELECT * FROM products');
    //Retorna o conteúdo da tabela como resposta
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // Se ocorrrer um erro na consulta ou na conexao
    return NextResponse.json(
      { message: 'Erro ao buscar produtos', error: error.message },
      { status: 500 }
    );
  } }
    export async function POST(req) {
      try {
        // 1. Extraia os dados da requisição
        const body = await req.json(); // Pega o corpo da requisição
         
    
        // 2. Valide os dados
        const { name, price, stock = 0 } = body;
        if (!name || !price) {
          return NextResponse.json(
            { message: 'Campos obrigatórios estão faltando.' },
            { status: 400 }
          );
        }
    
        // 3. Insira os dados no banco
        const result = await db.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [name, price, stock]);
    
        // 4. Retorne uma resposta de sucesso
        return NextResponse.json(
          { message: 'Produto inserido com sucesso!', productId: result.insertId },
          { status: 201 }
        );
    
      } catch (error) {
        // 5. Trate erros
        return NextResponse.json(
          { message: 'Erro ao inserir o produto', error: error.message },
          { status: 500 }
        );
      }
    } 