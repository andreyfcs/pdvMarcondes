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
        const { sale_id, product_id, quantity, price } = await req.json();

        // Verifica campos obrigatórios
        if (!sale_id || !product_id || !quantity || !price) {
            return NextResponse.json(
                { message: 'Todos os campos são obrigatórios: sale_id, product_id, quantity, price' },
                { status: 400 }
            );
        }

        // Verifica se a venda e o produto existem usando INNER JOIN
        const checkQuery = `
            SELECT s.id AS sale_id, p.id AS product_id 
            FROM sales s
            INNER JOIN products p ON s.id = ? AND p.id = ?
            WHERE s.id IS NOT NULL AND p.id IS NOT NULL;
        `;
        const [checkResults] = await db.query(checkQuery, [sale_id, product_id]);

        // Se não encontrar resultados, retorna erro
        if (checkResults.length === 0) {
            return NextResponse.json(
                { message: 'Venda ou produto não encontrado' },
                { status: 404 }
            );
        }

        // Insere o item de venda após validação
        const insertQuery = `
            INSERT INTO sale_items (sale_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(insertQuery, [sale_id, product_id, quantity, price]);

        return NextResponse.json(
            { message: 'Item de venda criado com sucesso!', id: result.insertId },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro:', error);
        return NextResponse.json(
            { message: 'Erro ao processar a solicitação', error: error.message },
            { status: 500 }
        );
    }
}