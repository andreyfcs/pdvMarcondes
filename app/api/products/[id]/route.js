import { NextResponse } from 'next/server';
import db from '../../../lib/db'; // Verifique o caminho correto

// GET: Obter um produto específico pelo ID
export async function GET(req, { params }) {
  try {
    const { id } = params; // Extrai o ID dos parâmetros da rota
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);

    if (product.length === 0) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar o produto', error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Atualizar um produto específico pelo ID
export async function PUT(req, { params }) {
  try {
    const { id } = params; // Extrai o ID dos parâmetros da rota
    const body = await req.json(); // Lê o corpo da requisição
    const { name, price, stock } = body;

    if (!name || !price) {
      return NextResponse.json(
        { message: 'Campos obrigatórios estão faltando.' },
        { status: 400 }
      );
    }

    const result = await db.query(
      'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
      [name, price, stock, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Produto atualizado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o produto', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remover um produto específico pelo ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Extrai o ID dos parâmetros da rota

    const result = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Produto removido com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao remover o produto', error: error.message },
      { status: 500 }
    );
  }
}
