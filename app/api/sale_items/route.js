import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET(req) {
    try {
        const [saleItems] = await db.query('SELECT * FROM sale_items');
        return NextResponse.json(saleItems, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao buscar venda', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
      // Pega os dados enviados pelo cliente
      const { sale_id, product_id, quantity, price } = await req.json();
  
      // Verifica se todos os dados necessários foram fornecidos
      if (!sale_id || !product_id || !quantity || !price) {
        return new Response('Faltam parâmetros', { status: 400 });
      }
  
      // Insere os dados na tabela sale_items
      const query = `
        INSERT INTO sale_items (sale_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `;
      const values = [sale_id, product_id, quantity, price];
  
      // Executa a consulta
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Erro ao inserir no banco de dados:', err);
          return new Response('Erro ao inserir item', { status: 500 });
        }
        return new Response(JSON.stringify({ message: 'Item inserido com sucesso!' }), { status: 200 });
      });
    } catch (err) {
      console.error('Erro: ', err);
      return new Response('Erro interno no servidor', { status: 500 });
    }
  }