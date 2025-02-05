import { NextResponse } from 'next/server';
import db from '../../../lib/db'; // Verifique o caminho correto

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// GET: Obter uma venda específico pelo ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function GET(req, { params }) {
  //criar const products, const sale_items
  try {
    const { id } = params; // Extrai o ID dos parâmetros da rota
    const [sales] = await db.query('SELECT * FROM sales WHERE id = ?', [id]);

    if (sales.length === 0) {
      return NextResponse.json(
        { message: 'Venda não encontrado' },
        { status: 404 });
    }

    return NextResponse.json(sales[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar venda', error: error.message },
      { status: 500 }
    );
  }
}//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// PUT: Atualizar uma venda específica pelo ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function PUT(req, { params }) {
  try {
    const { id } = params; // Extrai o ID dos parâmetros da rota
    const body = await req.json(); // Lê o corpo da requisição
    const { sale_date, total } = body;

    if (total === undefined) {
      return NextResponse.json(
        { message: 'Campos obrigatórios estão faltando.' },
        { status: 400 }
      );
    }

    const result = await db.query(
      'UPDATE sales SET total = ? WHERE id = ?',
      [total, id]
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
}//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// DELETE: Remover um produto específico pelo ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Extrai o ID dos parâmetros da rota

    const result = await db.query('DELETE FROM sales WHERE id = ?', [id]);

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
}//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



